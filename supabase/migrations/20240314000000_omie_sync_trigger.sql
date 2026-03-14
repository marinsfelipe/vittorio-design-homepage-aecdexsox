-- Enable the pg_net extension for outbound HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the webhook function that prepares the payload and sends it to the edge function
CREATE OR REPLACE FUNCTION public.trigger_omie_sync()
RETURNS trigger AS $$
DECLARE
  payload JSONB;
  request_id BIGINT;
  edge_function_url TEXT;
  auth_header TEXT;
BEGIN
  -- Build the JSON payload matching the Supabase webhook structure
  payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', row_to_json(NEW)::jsonb,
    'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD)::jsonb ELSE null END
  );

  -- Retrieve environment variables set by Supabase or fallback for local development
  edge_function_url := coalesce(
    current_setting('app.settings.edge_function_url', true), 
    'http://host.docker.internal:54321/functions/v1'
  ) || '/sync-omie';

  auth_header := 'Bearer ' || coalesce(
    current_setting('app.settings.service_role_key', true), 
    'anon-key'
  );

  -- Perform the asynchronous HTTP POST request using pg_net
  SELECT net.http_post(
    url := edge_function_url,
    body := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', auth_header
    )
  ) INTO request_id;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Prevent the transaction from failing if the HTTP request cannot be queued
  RAISE WARNING 'Omie sync trigger failed to queue request: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it already exists to allow idempotent execution
DROP TRIGGER IF EXISTS on_produto_changed_omie_sync ON public.produtos;

-- Bind the trigger to INSERT and UPDATE operations on the produtos table
CREATE TRIGGER on_produto_changed_omie_sync
  AFTER INSERT OR UPDATE ON public.produtos
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_omie_sync();
