# https://cloud.google.com/run/docs/tutorials/pubsub

export GOOGLE_CLOUD_PROJECT=chitrashala
export TOPIC_NAME=gcs-events
export PROJECT_NUMBER="$(gcloud projects list --filter=${GOOGLE_CLOUD_PROJECT} --format='value(PROJECT_NUMBER)')"
export SERVICE_NAME=thumbnail-service
export SERVICE_URL="$(gcloud run services list --platform managed --filter=${SERVICE_NAME} --format='value(URL)')"
export SERVICE_ACCOUNT=${TOPIC_NAME}-sa
export BUCKET_PICTURES=chitra-bhandar-${GOOGLE_CLOUD_PROJECT}
# export THUMBNAIL_BUCKET=uploaded-pictures-${GOOGLE_CLOUD_PROJECT}

# Create pubsub topic
gcloud pubsub topics create ${TOPIC_NAME}

# Create Pub/Sub notifications when files are stored in the bucket:
gsutil notification create -t ${TOPIC_NAME} -f json gs://chitra-bhandar

# Create a service account to represent the Pub/Sub subscription identity:
gcloud iam service-accounts create ${SERVICE_ACCOUNT} --display-name "Cloud Run Pub/Sub Invoker"

# Give the service account permission to invoke the service:
gcloud run services add-iam-policy-binding ${SERVICE_NAME} \
   --member=serviceAccount:${SERVICE_ACCOUNT}@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com \
   --role=roles/run.invoker \
   --platform managed \
   --region=us-central1

# Enable Pub/Sub to create authentication tokens in our project:
gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
     --member=serviceAccount:service-${PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com \
     --role=roles/iam.serviceAccountTokenCreator

# Finally, create a Pub/Sub subscription with the service account:
gcloud pubsub subscriptions create ${TOPIC_NAME}-subscription --topic ${TOPIC_NAME} \
   --push-endpoint=${SERVICE_URL} \
   --push-auth-service-account=${SERVICE_ACCOUNT}@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com