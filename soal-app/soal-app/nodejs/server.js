const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Daftar soal dengan pilihan ganda
const questions = [
  {
    question: 'You are helping the QA team to roll out a new load-testing tool to test the scalability of your primary cloud services that run on Google Compute Engine with Cloud Bigtable. Which three requirements should they include? (Choose three.)',
    options: [
      'Ensure that the load tests validate the performance of Cloud Bigtable',
      'Create a separate Google Cloud project to use for the load-testing environment',
      'Schedule the load-testing tool to regularly run against the production environment',
      'Ensure all third-party systems your services use is capable of handling high load',
      'Instrument the production services to record every transaction for replay by the load-testing tool',
      'Instrument the load-testing tool and the target services with detailed logging and metrics collection',
    ],
    answer: [
      'Ensure that the load tests validate the performance of Cloud Bigtable',
      'Create a separate Google Cloud project to use for the load-testing environment',
      'Instrument the load-testing tool and the target services with detailed logging and metrics collection',
    ],
 },
  {
    question: 'Your team needs to create a Google Kubernetes Engine (GKE) cluster to host a newly built application that requires access to third-party services on the internet. Your company does not allow any Compute Engine instance to have a public IP address on Google Cloud. You need to create a deployment strategy that adheres to these guidelines. What should you do?',
    options: [
      'Configure the GKE cluster as a private cluster, and configure Cloud NAT Gateway for the cluster subnet',
      'Configure the GKE cluster as a private cluster. Configure Private Google Access on the Virtual Private Cloud (VPC)',
      'Configure the GKE cluster as a route-based cluster. Configure Private Google Access on the Virtual Private Cloud (VPC)',
      'Create a Compute Engine instance, and install a NAT Proxy on the instance. Configure all workloads on GKE to pass through this proxy to access third-party services on the Internet'
    ],
    answer: 'Configure the GKE cluster as a private cluster, and configure Cloud NAT Gateway for the cluster subnet',
  },
  {
    question: 'Your company is planning to upload several important files to Cloud Storage. After the upload is completed, they want to verify that the uploaded content is identical to what they have on-premises. You want to minimize the cost and effort of performing this check. What should you do?',
    options: [
      '1. Use Linux shasum to compute a digest of files you want to upload. 2. Use gsutil -m to upload all the files to Cloud Storage. 3. Use gsutil cp to download the uploaded files. 4. Use Linux shasum to compute a digest of the downloaded files. 5. Compare the hashes',
      '1. Use gsutil -m to upload the files to Cloud Storage. 2. Develop a custom Java application that computes CRC32C hashes. 3. Use gsutil ls -L gs://[YOUR_BUCKET_NAME] to collect CRC32C hashes of the uploaded files. 4. Compare the hashes',
      '1. Use gsutil -m to upload all the files to Cloud Storage. 2. Use gsutil cp to download the uploaded files. 3. Use Linux diff to compare the content of the files',
      '1. Use gsutil -m to upload the files to Cloud Storage. 2. Use gsutil hash -c FILE_NAME to generate CRC32C hashes of all on-premises files. 3. Use gsutil ls -L gs://[YOUR_BUCKET_NAME] to collect CRC32C hashes of the uploaded files. 4. Compare the hashes'
    ],
    answer: '1. Use gsutil -m to upload the files to Cloud Storage. 2. Use gsutil hash -c FILE_NAME to generate CRC32C hashes of all on-premises files. 3. Use gsutil ls -L gs://[YOUR_BUCKET_NAME] to collect CRC32C hashes of the uploaded files. 4. Compare the hashes',
  },
  {
    question: 'You have deployed an application on Anthos clusters (formerly Anthos GKE). According to the SRE practices at your company, you need to be alerted if request latency is above a certain threshold for a specified amount of time. What should you do?',
    options: [
      'Install Anthos Service Mesh on your cluster. Use the Google Cloud Console to define a Service Level Objective (SLO), and create an alerting policy based on this SLO',
      'Enable the Cloud Trace API on your project, and use Cloud Monitoring Alerts to send an alert based on the Cloud Trace metrics',
      'Use Cloud Profiler to follow up the request latency. Create a custom metric in Cloud Monitoring based on the results of Cloud Profiler, and create an Alerting policy in case this metric exceeds the threshold.',
      'Configure Anthos Config Management on your cluster, and create a yaml file that defines the SLO and alerting policy you want to deploy in your cluster'
    ],
    answer: 'Install Anthos Service Mesh on your cluster. Use the Google Cloud Console to define a Service Level Objective (SLO), and create an alerting policy based on this SLO',
  },
  {
    question: 'Your company has a stateless web API that performs scientific calculations. The web API runs on a single Google Kubernetes Engine (GKE) cluster. The cluster is currently deployed in us-central1. Your company has expanded to offer your API to customers in Asia. You want to reduce the latency for users in Asia. What should you do?',
    options: [
      'Create a second GKE cluster in asia-southeast1, and expose both APIs using a Service of type LoadBalancer. Add the public IPs to the Cloud DNS zone.',
      'Use a global HTTP(s) load balancer with Cloud CDN enabled.',
      'Create a second GKE cluster in asia-southeast1, and use kubemci to create a global HTTP(s) load balancer.',
      'Increase the memory and CPU allocated to the application in the cluster.'
    ],
    answer: 'Create a second GKE cluster in asia-southeast1, and use kubemci to create a global HTTP(s) load balancer.',
  },
  {
    question: 'Your company runs several databases on a single MySQL instance. They need to take backups of a specific database at regular intervals. The backup activity needs to complete as quickly as possible and cannot be allowed to impact disk performance. How should you configure the storage?',
    options: [
      'Configure a cron job to use the gcloud tool to take regular backups using persistent disk snapshots.',
      'Mount a Local SSD volume as the backup location. After the backup is complete, use gsutil to move the backup to Google Cloud Storage.',
      'Use gcsfise to mount a Google Cloud Storage bucket as a volume directly on the instance and write backups to the mounted location using mysqldump.',
      'Mount additional persistent disk volumes onto each virtual machine (VM) instance in a RAID10 array and use LVM to create snapshots to send to Cloud Storage'
    ],
    answer: 'Mount a Local SSD volume as the backup location. After the backup is complete, use gsutil to move the backup to Google Cloud Storage.',
  },
  {
    question: 'You are migrating third-party applications from optimized on-premises virtual machines to Google Cloud. You are unsure about the optimum CPU and memory options. The applications have a consistent usage pattern across multiple weeks. You want to optimize resource usage for the lowest cost. What should you do?',
    options: [
      'Create an instance template with the smallest available machine type, and use an image of the third-party application taken from a current on-premises virtual machine. Create a managed instance group that uses average CPU utilization to autoscale the number of instances in the group. Modify the average CPU utilization threshold to optimize the number of instances running.',
      'Create an App Engine flexible environment, and deploy the third-party application using a Dockerfile and a custom runtime. Set CPU and memory options similar to your application\'s current on-premises virtual machine in the app.yaml file',
      'Create multiple Compute Engine instances with varying CPU and memory options. Install the Cloud Monitoring agent, and deploy the third-party application on each of them. Run a load test with high traffic levels on the application, and use the results to determine the optimal settings.',
      'Create a Compute Engine instance with CPU and memory options similar to your application\'s current on-premises virtual machine. Install the Cloud Monitoring agent, and deploy the third-party application. Run a load test with normal traffic levels on the application, and follow the Rightsizing Recommendations in the Cloud Console.'
    ],
    answer: 'Create a Compute Engine instance with CPU and memory options similar to your application\'s current on-premises virtual machine. Install the Cloud Monitoring agent, and deploy the third-party application. Run a load test with normal traffic levels on the application, and follow the Rightsizing Recommendations in the Cloud Console.',
  },
  {
    question: 'Your customer is moving their corporate applications to Google Cloud Platform. The security team wants detailed visibility of all projects in the organization. You provision the Google Cloud Resource Manager and set up yourself as the org admin. What Google Cloud Identity and Access Management (Cloud IAM) roles should you give to the security team?',
    options: [
      'Org viewer, project owner',
      'Org viewer, project viewer',
      'Org admin, project browser',
      'Project owner, network admin'
    ],
    answer: 'Org viewer, project viewer',
  },
  {
    question: 'Your company has a Google Cloud project that uses BigQuery for data warehousing. They have a VPN tunnel between the on-premises environment and Google Cloud that is configured with Cloud VPN. The security team wants to avoid data exfiltration by malicious insiders, compromised code, and accidental oversharing. What should they do?',
    options: [
      'Configure Private Google Access for on-premises only.',
      'Perform the following tasks: 1. Create a service account. 2. Give the BigQuery JobUser role and Storage Reader role to the service account. 3. Remove all other IAM access from the project.',
      'Configure VPC Service Controls and configure Private Google Access.',
      'Configure Private Google Access.',
    ],
    answer: 'Configure VPC Service Controls and configure Private Google Access.',
  },
  {
    question: 'You are working at an institution that processes medical data. You are migrating several workloads onto Google Cloud. Company policies require all workloads to run on physically separated hardware, and workloads from different clients must also be separated. You created a sole-tenant node group and added a node for each client. You need to deploy the workloads on these dedicated hosts. What should you do?',
    options: [
      'Add the node group name as a network tag when creating Compute Engine instances in order to host each workload on the correct node group.',
      'Add the node name as a network tag when creating Compute Engine instances in order to host each workload on the correct node.',
      'Use node affinity labels based on the node group name when creating Compute Engine instances in order to host each workload on the correct node group.',
      'Use node affinity labels based on the node name when creating Compute Engine instances in order to host each workload on the correct node.'
    ],
    answer: 'Use node affinity labels based on the node name when creating Compute Engine instances in order to host each workload on the correct node.',
  },
  {
    question: 'Your companys test suite is a custom C++ application that runs tests throughout each day on Linux virtual machines. The full test suite takes several hours to complete, running on a limited number of on-premises servers reserved for testing. Your company wants to move the testing infrastructure to the cloud, to reduce the amount of time it takes to fully test a change to the system, while changing the tests as little as possible. Which cloud infrastructure should you recommend?',
    options: [
      'Google Compute Engine unmanaged instance groups and Network Load Balancer',
      'Google Compute Engine managed instance groups with auto-scaling',
      'Google Cloud Dataproc to run Apache Hadoop jobs to process each test',
      'Google App Engine with Google StackDriver for logging'
    ],
    answer: 'Google Compute Engine managed instance groups with auto-scaling',
  },
  {
    question: 'A lead software engineer tells you that his new application design uses websockets and HTTP sessions that are not distributed across the web servers. You want to help him ensure his application will run properly on Google Cloud Platform. What should you do?',
    options: [
      'Help the engineer to convert his websocket code to use HTTP streaming',
      'Review the encryption requirements for websocket connections with the security team',
      'Meet with the cloud operations team and the engineer to discuss load balancer options',
      'Help the engineer redesign the application to use a distributed user session service that does not rely on websockets and HTTP sessions.'
    ],
    answer: 'Meet with the cloud operations team and the engineer to discuss load balancer options',
  },
  {
    question: 'The application reliability team at your company this added a debug feature to their backend service to send all server events to Google Cloud Storage for eventual analysis. The event records are at least 50 KB and at most 15 MB and are expected to peak at 3,000 events per second. You want to minimize data loss Which process should you implement?',
    options: [
      'ג€¢ Append metadata to file body ג€¢ Compress individual files ג€¢ Name files with serverName ג€" Timestamp ג€¢ Create a new bucket if bucket is older than 1 hour and save individual files to the new bucket. Otherwise, save files to existing bucket.',
      'ג€¢ Batch every 10,000 events with a single manifest file for metadata ג€¢ Compress event files and manifest file into a single archive file ג€¢ Name files using serverName ג€" EventSequence ג€¢ Create a new bucket if bucket is older than 1 day and save the single archive file to the new bucket. Otherwise, save the single archive file to existing bucket.',
      'ג€¢ Compress individual files ג€¢ Name files with serverName ג€" EventSequence ג€¢ Save files to one bucket ג€¢ Set custom metadata headers for each object after saving',
      'ג€¢ Append metadata to file body ג€¢ Compress individual files ג€¢ Name files with a random prefix pattern ג€¢ Save files to one bucket'
    ],
    answer: 'ג€¢ Append metadata to file body ג€¢ Compress individual files ג€¢ Name files with a random prefix pattern ג€¢ Save files to one bucket',
  },
  {
    question: 'A recent audit revealed that a new network was created in your GCP project. In this network, a GCE instance has an SSH port open to the world. You want to discover this networks origin. What should you do?',
    options: [
      'Search for Create VM entry in the Stackdriver alerting console',
      'Navigate to the Activity page in the Home section. Set category to Data Access and search for Create VM entry',
      'In the Logging section of the console, specify GCE Network as the logging section. Search for the Create Insert entry',
      'Connect to the GCE instance using project SSH keys. Identify previous logins in system logs, and match these with the project owners list'
    ],
    answer: 'In the Logging section of the console, specify GCE Network as the logging section. Search for the Create Insert entry'
  },

  {
    question: 'You want to make a copy of a production Linux virtual machine in the US-Central region. You want to manage and replace the copy easily if there are changes on the production virtual machine. You will deploy the copy as a new instance in a different project in the US-East region. What steps must you take?',
    options: [
      'Use the Linux dd and netcat commands to copy and stream the root disk contents to a new virtual machine instance in the US-East region.',
      'Create a snapshot of the root disk and select the snapshot as the root disk when you create a new virtual machine instance in the US-East region.',
      'Create an image file from the root disk with Linux dd command, create a new virtual machine instance in the US-East region',
      'Create a snapshot of the root disk, create an image file in Google Cloud Storage from the snapshot, and create a new virtual machine instance in the US-East region using the image file the root disk.'
    ],
    answer: 'Create a snapshot of the root disk, create an image file in Google Cloud Storage from the snapshot, and create a new virtual machine instance in the US-East region using the image file the root disk.'
  },

  {
    question: 'Your company places a high value on being responsive and meeting customer needs quickly. Their primary business objectives are release speed and agility. You want to reduce the chance of security errors being accidentally introduced. Which two actions can you take? (Choose two.)',
    options: [
      'Ensure every code check-in is peer reviewed by a security SME',
      'Use source code security analyzers as part of the CI/CD pipeline',
      'Ensure you have stubs to unit test all interfaces between components',
      'Enable code signing and a trusted binary repository integrated with your CI/CD pipeline',
      'Run a vulnerability security scanner as part of your continuous-integration /continuous-delivery (CI/CD) pipeline',
      ],
      answer: [
        'Use source code security analyzers as part of the CI/CD pipeline',
        'Run a vulnerability security scanner as part of your continuous-integration /continuous-delivery (CI/CD) pipeline'
      ],
  },

  {
      question: 'Your company just finished a rapid lift and shift to Google Compute Engine for your compute needs. You have another 9 months to design and deploy a more cloud-native solution. Specifically, you want a system that is no-ops and auto-scaling. Which two compute products should you choose? (Choose two.)?',
      options: [
        'Compute Engine with containers',
        'Google Kubernetes Engine with containers',
        'Google App Engine Standard Environment',
        'Connect to the GCE instance using project SSH keys. Identify previous logins in system logs, and match these with the project owners list',
        'Compute Engine with managed instance groups.',
      ],
      answer: [
        'Google Kubernetes Engine with containers',
        'Google App Engine Standard Environment',
      ],  
   },

   { 
    question: 'One of your primary business objectives is being able to trust the data stored in your application. You want to log all changes to the application data. How can you design your logging system to verify authenticity of your logs?',
    options: [
      'Write the log concurrently in the cloud and on premises.',
      'Use a SQL database and limit who can modify the log table.',
      'Digitally sign each timestamp and log entry and store the signature.',
      'Create a JSON dump of each log entry and store it in Google Cloud Storage.',
    ],
    answer: 'Digitally sign each timestamp and log entry and store the signature.'
    }, 

    { 
      question: 'Your company has a Google Workspace account and Google Cloud Organization. Some developers in the company have created Google Cloud projects outside of the Google Cloud Organization. You want to create an Organization structure that allows developers to create projects, but prevents them from modifying production projects. You want to manage policies for all projects centrally and be able to set more restrictive policies for production projects. You want to minimize disruption to users and developers when business needs change in the future. You want to follo Google-recommended practices. Now should you design the Organization structure??',
      options: [
        '1. Create a second Google Workspace account and Organization. 2. Grant all developers the Project Creator IAM role on the new Organization. 3. Move the developer projects into the new Organization. 4. Set the policies for all projects on both Organizations. 5. Additionally, set the production policies on the original Organization..',
        '1. Create a folder under the Organization resource named €גProduction.2 € .גGrant all developers the Project Creator IAM role on the new Organization. 3. Move the developer projects into the new Organization. 4. Set the policies for all projects on the Organization. 5. Additionally, set the production policies on the €גProduction €גfolder.',
        '1. Create folders under the Organization resource named €גDevelopment €גand €גProduction.2 €.גGrant all developers the Project Creator IAM role on the €גDevelopment €גfolder. 3. Move the developer projects into the €גDevelopment €גfolder. 4. Set the policies for all projects on the Organization. 5. Additionally, set the production policies on the €גProduction €גfolder.',
        '1. Designate the Organization for production projects only. 2. Ensure that developers do not have the Project Creator IAM role on the Organization. 3. Create development projects outside of the Organization using thedeveloper Google Workspace accounts. 4. Set the policies for all projects on the Organization. 5. Additionally, set the production policies on the individual production projects.',
      ],
      answer: '1. Create folders under the Organization resource named €גDevelopment €גand €גProduction.2 €.גGrant all developers the Project Creator IAM role on the €גDevelopment €גfolder. 3. Move the developer projects into the €גDevelopment €גfolder. 4. Set the policies for all projects on the Organization. 5. Additionally, set the production policies on the €גProduction €גfolder.'
    }, 
    { 
      question: 'Your company has an application running on Compute Engine that allows users to play their favorite music. There are a fixed number of instances. Files are stored in Cloud Storage, and data is streamed directly to users. Users are reporting that they sometimes need to attempt to play popular songs multiple times before they are successful. You need to improve the performance of the application. What should you do?',
      options: [
        '1. Mount the Cloud Storage bucket using gcsfuse on all backend Compute Engine instances. 2. Serve music files directly from the backend Compute Engine instance.',
        '1. Create a Cloud Filestore NFS volume and attach it to the backend Compute Engine instances. 2. Download popular songs in Cloud Filestore. 3. Serve music files directly from the backend Compute Engine instance.',
        '1. Copy popular songs into CloudSQL as a blob. 2. Update application code to retrieve data from CloudSQL when Cloud Storage is overloaded',
        '1. Create a managed instance group with Compute Engine instances. 2. Create a global load balancer and configure it with two backends:  ‹—גManaged instance group  ‹—גCloud Storage bucket 3. Enable Cloud CDN on the bucket backend.',
      ],
      answer: '1. Create a managed instance group with Compute Engine instances. 2. Create a global load balancer and configure it with two backends:  ‹—גManaged instance group  ‹—גCloud Storage bucket 3. Enable Cloud CDN on the bucket backend.',
    },
    { 
      question: 'The operations team in your company wants to save Cloud VPN log events for one year. You need to configure the cloud infrastructure to save the logs. What should you do?',
      options: [
        'Set up a filter in Cloud Logging and a Cloud Storage bucket as an export target for the logs you want to save.',
        'Enable the Compute Engine API, and then enable logging on the firewall rules that match the traffic you want to save',
        'Set up a Cloud Logging Dashboard titled Cloud VPN Logs, and then add a chart that queries for the VPN metrics over a one-year time period',
        'Set up a filter in Cloud Logging and a topic in Pub/Sub to publish the logs.',
      ],
      answer: 'Set up a filter in Cloud Logging and a Cloud Storage bucket as an export target for the logs you want to save.',
    },   
    { 
      question: 'You are working with a data warehousing team that performs data analysis. The team needs to process data from external partners, but the data contains personally identifiable information (PII). You need to process and store the data without storing any of the PIIE data. What should you do?',
      options: [
        'Create a Dataflow pipeline to retrieve the data from the external sources. As part of the pipeline, use the Cloud Data Loss Prevention (Cloud DLP) API to remove any PII data. Store the result in BigQuery.',
        'Create a Dataflow pipeline to retrieve the data from the external sources. As part of the pipeline, store all non-PII data in BigQuery and store all PII data in a Cloud Storage bucket that has a retention policy set.',
        'Ask the external partners to upload all data on Cloud Storage. Configure Bucket Lock for the bucket. Create a Dataflow pipeline to read the data from the bucket. As part of the pipeline, use the Cloud Data Loss Prevention (Cloud DLP) API to remove any PII data. Store the result in BigQuery.',
        'Ask the external partners to upload all data on Cloud Storage. Configure Bucket Lock for the bucket.Create a Dataflow pipeline to read the data from the bucket. As part of the pipeline, use the Cloud Data Loss Prevention (Cloud DLP) API to remove any PII data. Store the result in BigQuery.',
      ],
      answer: 'Create a Dataflow pipeline to retrieve the data from the external sources. As part of the pipeline, use the Cloud Data Loss Prevention (Cloud DLP) API to remove any PII data. Store the result in BigQuery.',
    }, 
    {
    question: 'You want to allow your operations team to store logs from all the production projects in your Organization, without including logs from other projects. All of the production projects are contained in a folder. You want to ensure that all logs for existing and new production projects are captured automatically. What should you do?',
    options: [
      'Create an aggregated export on the Production folder. Set the log sink to be a Cloud Storage bucket in an operations project.',  
      'Create an aggregated export on the Organization resource. Set the log sink to be a Cloud Storage bucket in an operations project.',
      'Create log exports in the production projects. Set the log sinks to be a Cloud Storage bucket in an operations project.',
      'Create log exports in the production projects. Set the log sinks to be BigQuery datasets in the production projects, and grant IAM access to the operations team to run queries on the datasets.',
    ],
    answer: 'Create an aggregated export on the Production folder. Set the log sink to be a Cloud Storage bucket in an operations project.',
  },    
  {
    question: 'Your company has an application that is running on multiple instances of Compute Engine. It generates 1 TB per day of logs. For compliance reasons, the logs need to be kept for at least two years. The logs need to be available for active query for 30 days. After that, they just need to be retained for audit purposes. You want to implement a storage solution that is compliant, minimizes costs, and follows Google-recommended practices. What should you do?',
    options: [
      '1. Install a Cloud Logging agent on all instances. 2. Create a sink to export logs into a regional Cloud Storage bucket. 3. Create an Object Lifecycle rule to move files into a Coldline Cloud Storage bucket after one month. 4. Configure a retention policy at the bucket level using bucket lock.',  
      '1. Write a daily cron job, running on all instances, that uploads logs into a Cloud Storage bucket. 2.Create a sink to export logs into a regional Cloud Storage bucket. 3. Create an Object Lifecycle rule to move files into a Coldline Cloud Storage bucket after one month.',
      '1. Install a Cloud Logging agent on all instances. 2. Create a sink to export logs into a partitioned BigQuery table. 3. Set a time_partitioning_expiration of 30 days.',
      '1. Create a daily cron job, running on all instances, that uploads logs into a partitioned BigQuery table. 2. Set a time_partitioning_expiration of 30 days.',
    ],
    answer: '1. Install a Cloud Logging agent on all instances. 2. Create a sink to export logs into a regional Cloud Storage bucket. 3. Create an Object Lifecycle rule to move files into a Coldline Cloud Storage bucket after one month. 4. Configure a retention policy at the bucket level using bucket lock.',
  },
  {
    question: 'Your company has just recently activated Cloud Identity to manage users. The Google Cloud Organization has been configured as well. The security team needs to secure projects that will be part of the Organization. They want to prohibit IAM users outside the domain from gaining permissions from now on. What should they do?',
    options: [
      'Configure an organization policy to restrict identities by domain',  
      'Configure an organization policy to block creation of service accounts',
      'Configure Cloud Scheduler to trigger a Cloud Function every hour that removes all users that dont belong to the Cloud Identity domain from all projects',
      'Create a technical user (e.g., crawler@yourdomain.com), and give it the project owner role at root organization level. Write a bash script that:  ¢€גLists all the IAM rules of all projects within the organization. ¢€ג Deletes all users that do not belong to the company domain. Create a Compute Engine instance in a project within the Organization and configure gcloud to be executed with technical user credentials. Configure a cron job that executes the bash script every hour',
    ],
    answer: 'Configure an organization policy to restrict identities by domain',
  },    
  {
    question: 'Your company has a Google Cloud project that uses BigQuery for data warehousing. There are some tables that contain personally identifiable information (PII). Only the compliance team may access the PII. The other information in the tables must be available to the data science team. You want to minimize cost and the time it takes to assign appropriate access to the tables. What should you do?',
    options: [
      '1. From the dataset where you have the source data, create views of tables that you want to share, excluding PII. 2. Assign an appropriate project-level IAM role to the members of the data science team. 3. Assign access controls to the dataset that contains the view',  
      '1. From the dataset where you have the source data, create materialized views of tables that you want to share, excluding PII. 2. Assign an appropriate project-level IAM role to the members of the data science team. 3. Assign access controls to the dataset that contains the view',
      '1. Create a dataset for the data science team. 2. Create views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset',
      '1. Create a dataset for the data science team. 2. Create materialized views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset.',
    ],
    answer: '1. Create a dataset for the data science team. 2. Create views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset',
  },
  {
    question: 'Your company has an application running on Google Cloud that is collecting data from thousands of physical devices that are globally distributed. Data is published to Pub/Sub and streamed in real time into an SSD Cloud Bigtable cluster via a Dataflow pipeline. The operations team informs you that your Cloud Bigtable cluster has a hotspot, and queries are taking longer than expected. You need to resolve the problem and prevent it from happening in the future. What should you do?',
    options: [
      'Advise your clients to use HBase APIs instead of NodeJS APIs',  
      'Delete records older than 30 days.',
      'Review your RowKey strategy and ensure that keys are evenly spread across the alphabet.',
      'Double the number of nodes you currently have.',
    ],
    answer: 'Review your RowKey strategy and ensure that keys are evenly spread across the alphabet.',
  },   
  {
    question: 'Your operations team currently stores 10 TB of data in an object storage service from a third-party provider.They want to move this data to a Cloud Storage bucket as quickly as possible, following Google-recommended practices. They want to minimize the cost of this data migration. Which approach should they use?',
    options: [
      'Use the gsutil mv command to move the data',  
      'Use the Storage Transfer Service to move the data',
      'Download the data to a Transfer Appliance, and ship it to Google.',
      'Download the data to the on-premises data center, and upload it to the Cloud Storage bucket.',
    ],
    answer: 'Use the Storage Transfer Service to move the data',
  },   
  {
    question: 'You have a Compute Engine managed instance group that adds and removes Compute Engine instances from the group in response to the load on your application. The instances have a shutdown script that removes REDIS database entries associated with the instance. You see that many database entries have not been removed, and you suspect that the shutdown script is the problem. You need to ensure that the commands in the shutdown script are run reliably every time an instance is shut down. You create a Cloud Function to remove the database entries. What should you do next?',
    options: [
      'Modify the shutdown script to wait for 30 seconds before triggering the Cloud Function',  
      'Do not use the Cloud Function. Modify the shutdown script to restart if it has not completed in 30 seconds',
      'Set up a Cloud Monitoring sink that triggers the Cloud Function after an instance removal log message arrives in Cloud Logging.',
      'Modify the shutdown script to wait for 30 seconds and then publish a message to a Pub/Sub queue.',
    ],
    answer: 'Set up a Cloud Monitoring sink that triggers the Cloud Function after an instance removal log message arrives in Cloud Logging.',
  },   
  {
    question: 'You are managing several projects on Google Cloud and need to interact on a daily basis with BigQuery, Bigtable, and Kubernetes Engine using the gcloud CL tool. You are travelling a lot and work on different workstations during the week. You want to avoid having to manage the gcloud CLI manually. What should you do?',
    options: [
      'Use Google Cloud Shell in the Google Cloud Console to interact with Google Cloud.',  
      'Create a Compute Engine instance and install gcloud on the instance. Connect to this instance via SSH to always use the same gcloud installation when interacting with Google Cloud.',
      'Install gcloud on all of your workstations. Run the command gcloud components auto-update on each workstation.',
      'Use a package manager to install gcloud on your workstations instead of installing it manually',
    ],
    answer: 'Use Google Cloud Shell in the Google Cloud Console to interact with Google Cloud.',
  },
  {
    question: 'Your company recently acquired a company that has infrastructure in Google Cloud. Each company has its own Google Cloud organization. Each company is using a Shared Virtual Private Cloud (VPC) to provide network connectivity for its applications. Some of the subnets used by both companies overlap. In order for both businesses to integrate, the applications need to have private network connectivity. These applications are not on overlapping subnets. You want to provide connectivity with minimal re-engineering. What should you do?',
    options: [
      'Set up VPC peering and peer each Shared VPC together.',  
      'Migrate the projects from the acquired company into your companys Google Cloud organization. Re-launch the instances in your companies Shared VPC. ',
      'Set up a Cloud VPN gateway in each Shared VPC and peer Cloud VPNs.',
      'Use a package manager to install gcloud on your workstations instead of installing it manually',
    ],
    answer: 'Set up a Cloud VPN gateway in each Shared VPC and peer Cloud VPNs.',
  }, 
  {
    question: 'You are managing several internal applications that are deployed on Compute Engine. Business users inform you that an application has become very slow over the past few days. You want to find the underlying cause in order to solve the problem. What should you do first?',
    options: [
      'Inspect the logs and metrics from the instances in Cloud Logging and Cloud Monitoring.',  
      'Change the Compute Engine Instances behind the application to a machine type with more CPU and memory.',
      'Restore a backup of the application database from a time before the application became slow.',
      'Deploy the applications on a managed instance group with autoscaling enabled. Add a load balancer in front of the managed instance group, and have the users connect to the IP of the load balancer.',
    ],
    answer: 'Inspect the logs and metrics from the instances in Cloud Logging and Cloud Monitoring.',
  }, 
  {
    question: 'Your company has an application running as a Deployment in a Google Kubernetes Engine (GKE) cluster. When releasing new versions of the application via a rolling deployment, the team has been causing outages. The root cause of the outages is misconfigurations with parameters that are only used in production. You want to put preventive measures for this in the platform to prevent outages. What should you do?',
    options: [
      'Configure liveness and readiness probes in the Pod specification.',  
      'Configure health checks on the managed instance group.',
      'Create a Scheduled Task to check whether the application is available.',
      'Configure an uptime alert in Cloud Monitoring.',
    ],
    answer: 'Configure liveness and readiness probes in the Pod specification.',
  },
  {
    question: 'Your company uses Google Kubernetes Engine (GKE) as a platform for all workloads. Your company has a single large GKE cluster that contains batch, stateful, and stateless workloads. The GKE cluster is configured with a single node pool with 200 nodes. Your company needs to reduce the cost of this cluster but does not want to compromise availability. What should you do?',
    options: [
      'Create a second GKE cluster for the batch workloads only. Allocate the 200 original nodes across both clusters.',  
      'Configure CPU and memory limits on the namespaces in the cluster. Configure all Pods to have a CPU and memory limits.',
      'Configure a HorizontalPodAutoscaler for all stateless workloads and for all compatible stateful workloads. Configure the cluster to use node auto scaling.',
      'Change the node pool to use preemptible VMs.',
    ],
    answer: 'Configure a HorizontalPodAutoscaler for all stateless workloads and for all compatible stateful workloads. Configure the cluster to use node auto scaling.',
  }, 
  {
    question: 'Your company has a Google Cloud project that uses BigQuery for data warehousing on a pay-per-use basis. You want to monitor queries in real time to discover the most costly queries and which users spend the most. What should you do?',
    options: [
      '1. In the BigQuery dataset that contains all the tables to be queried, add a label for each user that can launch a query. 2. Open the Billing page of the project. 3. Select Reports. 4. Select BigQuery as the product and filter by the user you want to check.Create a second GKE cluster for the batch workloads only. Allocate the 200 original nodes across both clusters.',  
      '1. Create a Cloud Logging sink to export BigQuery data access logs to BigQuery. 2. Perform a BigQuery query on the generated table to extract the information you need.',
      '1. Create a Cloud Logging sink to export BigQuery data access logs to Cloud Storage. 2. Develop a Dataflow pipeline to compute the cost of queries split by users.',
      '1. Activate billing export into BigQuery. 2. Perform a BigQuery query on the billing table to extract the information you need.',
    ],
    answer: '1. Create a Cloud Logging sink to export BigQuery data access logs to BigQuery. 2. Perform a BigQuery query on the generated table to extract the information you need.',
  }, 
  {
    question: 'Your company and one of its partners each have a Google Cloud project in separate organizations. Your companys project (prj-a) runs in Virtual Private Cloud (vpc-a). The partners project (prj-b) runs in vpc-b. There are two instances running on vpc-a and one instance running on vpc-b. Subnets defined in both VPCs are not overlapping. You need to ensure that all instances communicate with each other via internal IPs, minimizing latency and maximizing throughput. What should you do?',
    options: [
      'Set up a network peering between vpc-a and vpc-b.',  
      'Set up a VPN between vpc-a and vpc-b using Cloud VPN.',
      'Configure IAP TCP forwarding on the instance in vpc-b, and then launch the following gcloud command from one of the instances in vpc-a gcloud: gcloud compute start-iap-tunnel INSTANCE_NAME_IN_VPC_8 22 \--local-host-port=localhost:22 .',
      '1. Create an additional instance in vpc-a. 2. Create an additional instance in vpc-b. 3. Install OpenVPN in newly created instances. 4. Configure a VPN tunnel between vpc-a and vpc-b with the help of OpenVPN.',
    ],
    answer: 'Set up a network peering between vpc-a and vpc-b.',
  },
  {
    question: 'You want to store critical business information in Cloud Storage buckets. The information is regularly changed, but previous versions need to be referenced on a regular basis. You want to ensure that there is a record of all changes to any information in these buckets. You want to ensure that accidental edits or deletions can be easily rolled back. Which feature should you enable? .',
    options: [
      'Bucket Lock.',  
      'Object Versioning.',
      'Object change notification.',
      'Object Lifecycle Management.',
    ],
    answer: 'Object Versioning.',
  }, 
  {
    question: 'You have a Compute Engine application that you want to autoscale when total memory usage exceeds 80%. You have installed the Cloud Monitoring agent and configured the autoscaling policy as follows: ✑ Metric identifier: agent.googleapis.com/memory/percent_used ✑ Filter: metric.label.state = "used"  ✑ Target utilization level: 80 ✑ Target type: GAUGE You observe that the application does not scale under high load. You want to resolve this. What should you do?.',
    options: [
      'Change the Target type to DELTA_PER_MINUTE.',  
      'Change the Metric identifier to agent.googleapis.com/memory/bytes_used.',
      'Change the filter to metric.label.state = "use"  AND metric.label.state = "buffered" AND metric.label.state = "cached" AND metric.label.state = "slab".',
      'Change the filter to metric.label.state = "free" and the Target utilization to 20.',
    ],
    answer: 'Change the filter to metric.label.state = "use"  AND metric.label.state = "buffered" AND metric.label.state = "cached" AND metric.label.state = "slab".',
  },
  {
    question: 'You are deploying an application to Google Cloud. The application is part of a system. The application in Google Cloud must communicate over a private network with applications in a non-Google Cloud environment. The expected average throughput is 200 kbps. The business requires: ✑ as close to 100% system availability as possible ✑ cost optimizationYou need to design the connectivity between the locations to meet the business requirements. What should you provision',
    options: [
      'An HA Cloud VPN gateway connected with two tunnels to an on-premises VPN gateway.',  
      'Two Classic Cloud VPN gateways connected to two on-premises VPN gateways Configure each Classic Cloud VPN gateway to have two tunnels, each connected to different on-premises VPN gateways.',
      'Two HA Cloud VPN gateways connected to two on-premises VPN gateways Configure each HA Cloud VPN gateway to have two tunnels, each connected to different on-premises VPN gateways',
      'A single Cloud VPN gateway connected to an on-premises VPN gateway.',
    ],
    answer: 'An HA Cloud VPN gateway connected with two tunnels to an on-premises VPN gateway.',
  },
  {
    question: 'Your company has an application running on App Engine that allows users to upload music files and share them with other people. You want to allow users to upload files directly into Cloud Storage from their browser session. The payload should not be passed through the backend. What should you do? .',
    options: [
      '1. Set a CORS configuration in the target Cloud Storage bucket where the base URL of the App Engine application is an allowed origin. 2. Use the Cloud Storage Signed URL feature to generate a POST URL.',  
      '1. Set a CORS configuration in the target Cloud Storage bucket where the base URL of the App Engine application is an allowed origin.',
      '1. Use the Cloud Storage Signed URL feature to generate a POST URL.2. Use App Engine default credentials to sign requests against Cloud Storage.',
      '1. Assign the Cloud Storage WRITER role to users who upload files.2. Use App Engine default credentials to sign requests against Cloud Storage.',
    ],
    answer: '1. Set a CORS configuration in the target Cloud Storage bucket where the base URL of the App Engine application is an allowed origin. 2. Use the Cloud Storage Signed URL feature to generate a POST URL.',
  },
  {
    question: 'You are configuring the cloud network architecture for a newly created project in Google Cloud that will host applications in Compute Engine. Compute Engine virtual machine instances will be created in two different subnets (sub-a and sub-b) within a single region: • Instances in sub-a will have public IP addresses. • Instances in sub-b will have only private IP addresses. To download updated packages, instances must connect to a public repository outside the boundaries of Google Cloud. You need to allow sub-b to access the external repository. What should you do?.',
    options: [
      'Enable Private Google Access on sub-b.',  
      'Configure Cloud NAT and select sub-b in the NAT mapping section.',
      'Configure a bastion host instance in sub-a to connect to instances in sub-b.',
      'Enable Identity-Aware Proxy for TCP forwarding for instances in sub-b.',
    ],
    answer: 'Configure Cloud NAT and select sub-b in the NAT mapping section.',
  },
  {
    question: 'Your company is planning to migrate their Windows Server 2022 from their on-premises data center to Google Cloud. You need to bring the licenses that are currently in use in on-premises virtual machines into the target cloud environment. What should you do?.',
    options: [
      '1. Create an image of the on-premises virtual machines and upload into Cloud Storage. 2. Import the image as a virtual disk on Compute Engine.',  
      '1. Create standard instances on Compute Engine.2. Select as the OS the same Microsoft Windows version that is currently in use in the on-premises environment.',
      '1. Create an image of the on-premises virtual machine. 2. Import the image as a virtual disk on Compute Engine. 3. Create a standard instance on Compute Engine, selecting as the OS the same Microsoft Windows version that is currently in use in the on-premises environment. 4. Attach a data disk that includes data that matches the created image',
      '1. Create an image of the on-premises virtual machines. 2. Import the image as a virtual disk on Compute Engine using --os=windows-2022-dc-v. 3. Create a sole-tenancy instance on Compute Engine that uses the imported disk as a boot disk.',
    ],
    answer: '1. Create an image of the on-premises virtual machines. 2. Import the image as a virtual disk on Compute Engine using --os=windows-2022-dc-v. 3. Create a sole-tenancy instance on Compute Engine that uses the imported disk as a boot disk.',
  },
  {
    question: 'You are deploying an application to Google Cloud. The application is part of a system. The application in Google Cloud must communicate over a private network with applications in a non-Google Cloud environment. The expected average throughput is 200 kbps. The business requires: • 99.99% system availability • cost optimization You need to design the connectivity between the locations to meet the business requirements. What should you provision?.',
    options: [
      'An HA Cloud VPN gateway connected with two tunnels to an on-premises VPN gateway.',  
      'A Classic Cloud VPN gateway connected with two tunnels to an on-premises VPN gateway.',
      'Two HA Cloud VPN gateways connected to two on-premises VPN gateways. Configure each HA Cloud VPN gateway to have two tunnels, each connected to different on-premises VPN gateways.',
      'A Classic Cloud VPN gateway connected with one tunnel to an on-premises VPN gateway.',
    ],
    answer: 'An HA Cloud VPN gateway connected with two tunnels to an on-premises VPN gateway.',
  },
  {
    question: 'Your company wants to migrate their 10-TB on-premises database export into Cloud Storage. You want to minimize the time it takes to complete this activity and the overall cost. The bandwidth between the on-premises environment and Google Cloud is 1 Gbps. You want to follow Google-recommended practices. What should you do?.',
    options: [
      'Develop a Dataflow job to read data directly from the database and write it into Cloud Storage.',  
      'Use the Data Transfer appliance to perform an offline migration.',
      'Use a commercial partner ETL solution to extract the data from the on-premises database and upload it into Cloud Storage.',
      'Upload the data with gcloud storage cp.',
    ],
    answer: 'Upload the data with gcloud storage cp.',
  },
  {
    question: 'You are working at a financial institution that stores mortgage loan approval documents on Cloud Storage. Any change to these approval documents must be uploaded as a separate approval file. You need to ensure that these documents cannot be deleted or overwritten for the next 5 years. What should you do?.',
    options: [
      'Create a retention policy on the bucket for the duration of 5 years. Create a lock on the retention policy.',  
      'Create a retention policy organizational constraint constraints/storage.retentionPolicySeconds at the organization level. Set the duration to 5 years.',
      'Use a customer-managed key for the encryption of the bucket. Rotate the key after 5 years.',
      'Create a retention policy organizational constraint constraints/storage.retentionPolicySeconds at the project level. Set the duration to 5 years.',
    ],
    answer: 'Create a retention policy on the bucket for the duration of 5 years. Create a lock on the retention policy.',
  },
  {
    question: 'Your company has decided to make a major revision of their API in order to create better experiences for their developers. They need to keep the old version of the API available and deployable, while allowing new customers and testers to try out the new API. They want to keep the same SSL and DNS records in place to serve both APIs. What should they do?.',
    options: [
      'Configure a new load balancer for the new version of the API.',  
      'Reconfigure old clients to use a new endpoint for the new API.',
      'Have the old API forward traffic to the new API based on the path.',
      'Use separate backend pools for each API path behind the load balancer.',
    ],
    answer: 'Use separate backend pools for each API path behind the load balancer.',
  },
  {
    question: 'You have a Compute Engine application that you want to autoscale when total memory usage exceeds 80%. You have installed the Cloud Monitoring agent and configured the autoscaling policy as follows:You observe that the application does not scale under high load. You want to resolve this. What should you do?.',
    options: [
      'Change the Target type to DELTA_PER_MINUTE.',  
      'Change the Metric identifier to agent.googleapis.com/memory/bytes_used.',
      'Change the filter to metric.label.state = ‘used’.',
      'Change the filter to metric.label.state = ‘free’ and the Target utilization to 20.',
    ],
    answer: 'Change the filter to metric.label.state = ‘used’.',
  },
  {
    question: 'Your company has a Google Cloud project that uses BigOuery for data warehousing. The VPN tunnel between the on-premises environment and Google Cloud is configured with Cloud VPN. Your security team wants to avoid data exfiltration by malicious insiders, compromised code, and accidental oversharing. What should you do?.',
    options: [
      'Configure Private Service Connect.',  
      'Configure VPC Service Controls and configure Private Google Access for on-promises hosts.',
      'Create a service account, grant the BigQuery JobUser role and Storage Object Viewer role to the service account, and remove all other Identity and Access Management (IAM) access from the project.',
      'Configure Private Google Access.',
    ],
    answer: 'Configure VPC Service Controls and configure Private Google Access for on-promises hosts.',
  },
  {
    question: 'The JencoMart security team requires that all Google Cloud Platform infrastructure is deployed using a least privilege model with separation of duties for administration between production and development resources. What Google domain and project structure should you recommend?',
    options: [
      'Create two G Suite accounts to manage users: one for development/test/staging and one for production. Each account should contain one project for every application.',
      'Create two G Suite accounts to manage users: one with a single project for all development applications and one with a single project for all production applications.',
      'Create a single G Suite account to manage users with each stage of each application in its own project.',
      'Create a single G Suite account to manage users with one project for the development/test/staging environment and one project for the production environment.',
    ],
    answer: 'Create a single G Suite account to manage users with one project for the development/test/staging environment and one project for the production environment.',
  },
  {
    question: 'A few days after JencoMart migrates the user credentials database to Google Cloud Platform and shuts down the old server, the new database server stops responding to SSH connections. It is still serving database requests to the application servers correctly. What three steps should you take to diagnose the problem? (Choose three.)',
  options: [
    'Delete the virtual machine (VM) and disks and create a new one.',
    'Delete the instance, attach the disk to a new VM, and investigate.',
    'Take a snapshot of the disk and connect to a new machine to investigate.',
    'Check inbound firewall rules for the network the machine is connected to.',
    'Connect the machine to another network with very simple firewall rules and investigate.',
    'Print the Serial Console output for the instance for troubleshooting, activate the interactive console, and investigate.',
  ],
  answer: [
    'Take a snapshot of the disk and connect to a new machine to investigate.',
    'Check inbound firewall rules for the network the machine is connected to.',
    'Print the Serial Console output for the instance for troubleshooting, activate the interactive console, and investigate.',
  ],
  },
  {
    question: 'JencoMart has decided to migrate user profile storage to Google Cloud Datastore and the application servers to Google Compute Engine (GCE). During the migration, the existing infrastructure will need access to Datastore to upload the data. What service account key-management strategy should you recommend?',
    options: [
      'Provision service account keys for the on-premises infrastructure and for the GCE virtual machines (VMs).',
      'Authenticate the on-premises infrastructure with a user account and provision service account keys for the VMs.',
      'Provision service account keys for the on-premises infrastructure and use Google Cloud Platform (GCP) managed keys for the VMs.',
      'Deploy a custom authentication service on GCE/Google Kubernetes Engine (GKE) for the on-premises infrastructure and use GCP managed keys for the VMs.',
    ],    
    answer: 'Provision service account keys for the on-premises infrastructure and use Google Cloud Platform (GCP) managed keys for the VMs.',
  },
  {
    question: 'JencoMart has built a version of their application on Google Cloud Platform that serves traffic to Asia. You want to measure success against their business and technical goals. Which metrics should you track?',
    options: [
      'Error rates for requests from Asia.',
      'Latency difference between US and Asia.',
      'Total visits, error rates, and latency from Asia.',
      'Total visits and average latency for users from Asia.',
      'The number of character sets present in the database.',
    ],
    answer: 'Total visits, error rates, and latency from Asia.',
  },
  {
    question: 'The migration of JencoMart\'s application to Google Cloud Platform (GCP) is progressing too slowly. The infrastructure is shown in the diagram. You want to maximize throughput. What are three potential bottlenecks? (Choose three.)',
    options: [
      'A single VPN tunnel, which limits throughput.',
      'A tier of Google Cloud Storage that is not suited for this task.',
      'A copy command that is not suited to operate over long distances.',
      'Fewer virtual machines (VMs) in GCP than on-premises machines.',
      'A separate storage layer outside the VMs, which is not suited for this task.',
      'Complicated internet connectivity between the on-premises infrastructure and GCP.',
    ],
    answer: [
      'A single VPN tunnel, which limits throughput.',
      'A copy command that is not suited to operate over long distances.',
      'Complicated internet connectivity between the on-premises infrastructure and GCP.',
    ],
  },
  {
    question: 'JencoMart wants to move their User Profiles database to Google Cloud Platform. Which Google Database should they use?',
    options: [
      'Cloud Spanner',
      'Google BigQuery',
      'Google Cloud SQL',
      'Google Cloud Datastore',
    ],
    answer: 'Cloud Spanner',
  },
  {
    question: 'Company overview -\nHelicopter Racing League (HRL) is a global sports league for competitive helicopter racing. Each year HRL holds the world championship and several regional league competitions where teams compete to earn a spot in the world championship. HRL offers a paid service to stream the races all over the world with live telemetry and predictions throughout each race.\n\nSolution concept -\nHRL wants to migrate their existing service to a new platform to expand their use of managed AI and ML services to facilitate race predictions. Additionally, as new fans engage with the sport, particularly in emerging regions, they want to move the serving of their content, both real-time and recorded, closer to their users.\n\nFor this question, refer to the Helicopter Racing League (HRL) case study. Your team is in charge of creating a payment card data vault for card numbers used to bill tens of thousands of viewers, merchandise consumers, and season ticket holders. You need to implement a custom card tokenization service that meets the following requirements:\n* It must provide low latency at minimal cost.\n* It must be able to identify duplicate credit cards and must not store plaintext card numbers.\n* It should support annual key rotation.\nWhich storage approach should you adopt for your tokenization service?',
    options: [
      'Store the card data in Secret Manager after running a query to identify duplicates.',
      'Encrypt the card data with a deterministic algorithm stored in Firestore using Datastore mode.',
      'Encrypt the card data with a deterministic algorithm and shard it across multiple Memorystore instances.',
      'Use column-level encryption to store the data in Cloud SQL.',
    ],
    answer: 'Encrypt the card data with a deterministic algorithm stored in Firestore using Datastore mode.',
  },
  {
    question: 'For this question, refer to the Helicopter Racing League (HRL) case study. Recently HRL started a new regional racing league in Cape Town, South Africa. In an effort to give customers in Cape Town a better user experience, HRL has partnered with the Content Delivery Network provider, Fastly. HRL needs to allow traffic coming from all of the Fastly IP address ranges into their Virtual Private Cloud network (VPC network). You are a member of the HRL security team and you need to configure the update that will allow only the Fastly IP address ranges through the External HTTP(S) load balancer. Which command should you use?',
    options: [
      'gcloud compute security-policies rules update 1000 \ --security-policy from-fastly \ --src-ip-ranges * \ --action "allow".',
      'gcloud compute firewall rules update sourceiplist-fastly \ --priority 100 \ --allow tcp:443.',
      'gcloud compute firewall rules update hir-policy \ --priority 100 \ --target-tags=sourceiplist-fastly \--allow tcp:443.',
      'gcloud compute security-policies rules update 1000 \ --security-policy hir-policy \ --expression "evaluatePreconfiguredExpr(\'sourceiplist-fastly\')"--action "allow".',
    ],
    answer: 'gcloud compute security-policies rules update 1000 \ --security-policy hir-policy \ --expression "evaluatePreconfiguredExpr(\'sourceiplist-fastly\')"--action "allow".',
  },
  {
    question: 'For this question, refer to the Helicopter Racing League (HRL) case study. The HRL development team releases a new version of their predictive capability application every Tuesday evening at 3 a.m. UTC to a repository. The security team at HRL has developed an in-house penetration test Cloud Function called Airwolf. The security team wants to run Airwolf against the predictive capability application as soon as it is released every Tuesday. You need to set up Airwolf to run at the recurring weekly cadence. What should you do?',
    options: [
      'Set up Cloud Tasks and a Cloud Storage bucket that triggers a Cloud Function.',
      'Set up a Cloud Logging sink and a Cloud Storage bucket that triggers a Cloud Function.',
      'Configure the deployment job to notify a Pub/Sub queue that triggers a Cloud Function.',
      'gcloud compute security-policies rules update 1000 \ --security-policy hir-policy \ --expression "evaluatePreconfiguredExpr(\'sourceiplist-fastly\')"--action "allow".',
    ],
    answer: 'Configure the deployment job to notify a Pub/Sub queue that triggers a Cloud Function.',
  },
  {
    question: 'For this question, refer to the Helicopter Racing League (HRL) case study. HRL wants better prediction accuracy from their ML prediction models. They want you to use Google\'s AI Platform so HRL can understand and interpret the predictions. What should you do?',
    options: [
      'Use Explainable AI.',
      'Use Vision AI.',
      'Use Google Cloud\'s operations suite.',
      'Use Jupyter Notebooks.',
    ],
    answer: 'Use Explainable AI.',
  },
  {
    question: 'For this question, refer to the Helicopter Racing League (HRL) case study. HRL is looking for a cost-effective approach for storing their race data such as telemetry. They want to keep all historical records, train models using only the previous season\'s data, and plan for data growth in terms of volume and information collected. You need to propose a data solution. Considering HRL business requirements and the goals expressed by CEO S. Hawke, what should you do?',
    options: [
      'Use Firestore for its scalable and flexible document-based database. Use collections to aggregate race data by season and event.',
      'Use Cloud Spanner for its scalability and ability to version schemas with zero downtime. Split race data using season as a primary key.',
      'Use BigQuery for its scalability and ability to add columns to a schema. Partition race data based on season.',
      'Use Cloud SQL for its ability to automatically manage storage increases and compatibility with MySQL. Use separate database instances for each season.',
    ],
    answer: 'Use BigQuery for its scalability and ability to add columns to a schema. Partition race data based on season.',
  },
  {
    question: 'For this question, refer to the Helicopter Racing League (HRL) case study. A recent finance audit of cloud infrastructure noted an exceptionally high number of Compute Engine instances are allocated to do video encoding and transcoding. You suspect that these Virtual Machines are zombie machines that were not deleted after their workloads completed. You need to quickly get a list of which VM instances are idle. What should you do?',
    options: [
      'Log into each Compute Engine instance and collect disk, CPU, memory, and network usage statistics for analysis.',
      'Use the gcloud compute instances list to list the virtual machine instances that have the idle: true label set.',
      'Use the gcloud recommender command to list the idle virtual machine instances.',
      'From the Google Console, identify which Compute Engine instances in the managed instance groups are no longer responding to health check probes.',
    ],
    answer: 'Use the gcloud recommender command to list the idle virtual machine instances.',
  },
  {
    story: `EHR Healthcare is a leading provider of electronic health record software to the medical industry. EHR Healthcare provides their software as a service to multi-national medical offices, hospitals, and insurance providers.
    
    Due to rapid changes in the healthcare and insurance industry, EHR Healthcare's business has been growing exponentially year over year. They need to be able to scale their environment, adapt their disaster recovery plan, and roll out new continuous deployment capabilities to update their software at a fast pace. Google Cloud has been chosen to replace their current colocation facilities.
    
    EHR's software is currently hosted in multiple colocation facilities. The lease on one of the data centers is about to expire. Customer-facing applications are web-based, and many have recently been containerized to run on a group of Kubernetes clusters. Data is stored in a mixture of relational and NoSQL databases (MySQL, MS SQL Server, Redis, and MongoDB).
    
    You are responsible for ensuring that EHR's use of Google Cloud will pass an upcoming privacy compliance audit.`,
    question: 'For this question, refer to the EHR Healthcare case study. You are responsible for ensuring that EHR\'s use of Google Cloud will pass an upcoming privacy compliance audit. What should you do? (Choose two.)',
    options: [
      'Verify EHR\'s product usage against the list of compliant products on the Google Cloud compliance page.',
      'Advise EHR to execute a Business Associate Agreement (BAA) with Google Cloud.',
      'Use Firebase Authentication for EHR\'s user-facing applications.',
      'Implement Prometheus to detect and prevent security breaches on EHR\'s web-based applications.',
      'Use GKE private clusters for all Kubernetes workloads.'
    ],
    answer: ['Verify EHR\'s product usage against the list of compliant products on the Google Cloud compliance page.', 'Advise EHR to execute a Business Associate Agreement (BAA) with Google Cloud.']
  },
  { 
    question: 'For this question, refer to the EHR Healthcare case study. You need to define the technical architecture for securely deploying workloads to Google Cloud. You also need to ensure that only verified containers are deployed using Google Cloud services. What should you do? (Choose two.)',
    options: [
      'Enable Binary Authorization on GKE, and sign containers as part of a CI/CD pipeline.',
      'Configure Jenkins to utilize Kritis to cryptographically sign a container as part of a CI/CD pipeline.',
      'Configure Container Registry to only allow trusted service accounts to create and deploy containers from the registry.',
      'Configure Container Registry to use vulnerability scanning to confirm that there are no vulnerabilities before deploying the workload.',
    ],
    answer: ['Enable Binary Authorization on GKE, and sign containers as part of a CI/CD pipeline.',
            'Configure Container Registry to use vulnerability scanning to confirm that there are no vulnerabilities before deploying the workload.'
    ]
  },
  { 
    question: 'You need to upgrade the EHR connection to comply with their requirements. The new connection design must support business-critical needs and meet the same network and security policy requirements. What should you do?',
    options: [
      'Add a new Dedicated Interconnect connection.',
      'Upgrade the bandwidth on the Dedicated Interconnect connection to 100 G.',
      'Add three new Cloud VPN connections.',
      'Add a new Carrier Peering connection.',
    ],
    answer: ['Add a new Dedicated Interconnect connection.']
  },
  { 
    question: 'For this question, refer to the EHR Healthcare case study. You need to define the technical architecture for hybrid connectivity between EHRs on-premises systems and Google Cloud. You want to follow Googles recommended practices for production-level applications. Considering the EHR Healthcare business and technical requirements, what should you do?',
    options: [
      'Configure two Partner Interconnect connections in one metro (City), and make sure the Interconnect connections are placed in different metro zones.',
      'Configure two VPN connections from on-premises to Google Cloud, and make sure the VPN devices on-premises are in separate racks.',
      'Configure Direct Peering between EHR Healthcare and Google Cloud, and make sure you are peering at least two Google locations.',
      'Configure two Dedicated Interconnect connections in one metro (City) and two connections in another metro, and make sure the Interconnect connections are placed in different metro zones.',
    ],
    answer: ['Configure two Dedicated Interconnect connections in one metro (City) and two connections in another metro, and make sure the Interconnect connections are placed in different metro zones.']


  },
  { 
    question: 'For this question, refer to the EHR Healthcare case study. You are a developer on the EHR customer portal team. Your team recently migrated the customer portal application to Google Cloud. The load has increased on the application servers, and now the application is logging many timeout errors. You recently incorporated Pub/Sub into the application architecture, and the application is not logging any Pub/Sub publishing errors. You want to improve publishing latency. What should you do?',
    options: [
      'Increase the Pub/Sub Total Timeout retry value.',
      'Move from a Pub/Sub subscriber pull model to a push model.',
      'Turn off Pub/Sub message batching.',
      'Create a backup Pub/Sub message queue.',
    ],
    answer: ['Turn off Pub/Sub message batching.']
  },
  { 
    question: 'For this question, refer to the EHR Healthcare case study. In the past, configuration errors put public IP addresses on backend servers that should not have been accessible from the Internet. You need to ensure that no one can put external IP addresses on backend Compute Engine instances and that external IP addresses can only be configured on frontend Compute Engine instances. What should you do?',
    options: [
      'Create an Organizational Policy with a constraint to allow external IP addresses only on the frontend Compute Engine instances.',
      'Revoke the compute.networkAdmin role from all users in the project with front end instances.',
      'Create an Identity and Access Management (IAM) policy that maps the IT staff to the compute.networkAdmin role for the organization.',
      'Create a custom Identity and Access Management (IAM) role named GCE_FRONTEND with the compute.addresses.create permission.',
    ],
    answer: ['Create an Organizational Policy with a constraint to allow external IP addresses only on the frontend Compute Engine instances.']
  },
  { 
    question: 'For this question, refer to the EHR Healthcare case study. You are responsible for designing the Google Cloud network architecture for Google Kubernetes Engine. You want to follow Google best practices. Considering the EHR Healthcare business and technical requirements, what should you do to reduce the attack surface?',
    options: [
      'Use a private cluster with a private endpoint with master authorized networks configured.',
      'Use a public cluster with firewall rules and Virtual Private Cloud (VPC) routes.',
      'Use a private cluster with a public endpoint with master authorized networks configured.',
      'Use a public cluster with master authorized networks enabled and firewall rules.',
    ],
    answer: ['Use a private cluster with a private endpoint with master authorized networks configured.']
  },
  {
    story: `Mountkirk Games makes online, session-based, multiplayer games for the most popular mobile platforms. They build all of their games using some server-side integration. Historically, they have used cloud providers to lease physical servers.
    
    Due to the unexpected popularity of some of their games, they have had problems scaling their global audience, application servers, MySQL databases, and analytics tools. Their current model is to write game statistics to files and send them through an ETL tool that loads them into a centralized MySQL database for reporting.
    
    Mountkirk Games is building a new game, which they expect to be very popular. They plan to deploy the game's backend on Google Compute Engine so they can capture streaming metrics, run intensive analytics, and take advantage of its autoscaling server environment and integrate with a managed NoSQL database.`,
    question: 'Mountkirk Games wants you to design their new testing strategy. How should the test coverage differ from their existing backends on the other platforms?',
    options: [
      'Tests should scale well beyond the prior approaches.',
      'Unit tests are no longer required, only end-to-end tests.',
      'Tests should be applied after the release is in the production environment.',
      'Tests should include directly testing the Google Cloud Platform (GCP) infrastructure',
    ],
    answer: ['Tests should scale well beyond the prior approaches.']
  },
  { 
    question: 'Mountkirk Games has deployed their new backend on Google Cloud Platform (GCP). You want to create a through testing process for new versions of the backend before they are released to the public. You want the testing environment to scale in an economical way. How should you design the process?',
    options: [
      'Create a scalable environment in GCP for simulating production load.',
      'Use the existing infrastructure to test the GCP-based backend at scale.',
      'Build stress tests into each component of your application using resources internal to GCP to simulate load.',
      'Create a set of static environments in GCP to test different levels of load ג€" for example, high, medium, and low.',
    ],
    answer: ['Create a scalable environment in GCP for simulating production load.']
  },
  {
    question: 'Mountkirk Games wants to set up a continuous delivery pipeline. Their architecture includes many small services that they want to be able to update and roll back quickly. Mountkirk Games has the following requirements:\n✑ Services are deployed redundantly across multiple regions in the US and Europe\n✑ Only frontend services are exposed on the public internet\n✑ They can provide a single frontend IP for their fleet of services\n✑ Deployment artifacts are immutable\nWhich set of products should they use?',
    options: [
      'Google Cloud Storage, Google Cloud Dataflow, Google Compute Engine',
      'Google Cloud Storage, Google App Engine, Google Network Load Balancer',
      'Google Kubernetes Registry, Google Container Engine, Google HTTP(S) Load Balancer',
      'Google Cloud Functions, Google Cloud Pub/Sub, Google Cloud Deployment Manager'
    ],
    answer: 'Google Kubernetes Registry, Google Container Engine, Google HTTP(S) Load Balancer',
  },
  {
    question: 'Mountkirk Games\' gaming servers are not automatically scaling properly. Last month, they rolled out a new feature, which suddenly became very popular. A record number of users are trying to use the service, but many of them are getting 503 errors and very slow response times. What should they investigate first?',
    options: [
      'Verify that the database is online.',
      'Verify that the project quota hasn\'t been exceeded.',
      'Verify that the new feature code did not introduce any performance bugs.',
      'Verify that the load-testing team is not running their tool against production.'
    ],
    answer: 'Verify that the project quota hasn\'t been exceeded.',
  },
  {
    question: 'Mountkirk Games needs to create a repeatable and configurable mechanism for deploying isolated application environments. Developers and testers can access each other\'s environments and resources, but they cannot access staging or production resources. The staging environment needs access to some services from production. What should you do to isolate development environments from staging and production?',
    options: [
      'Create a project for development and test and another for staging and production.',
      'Create a network for development and test and another for staging and production.',
      'Create one subnetwork for development and another for staging and production.',
      'Create one project for development, a second for staging and a third for production.'
    ],
    answer: 'Create one project for development, a second for staging and a third for production.',
  },
  {
    question: 'Mountkirk Games wants to set up a real-time analytics platform for their new game. The new platform must meet their technical requirements. Which combination of Google technologies will meet all of their requirements?',
    options: [
      'Kubernetes Engine, Cloud Pub/Sub, and Cloud SQL.',
      'Cloud Dataflow, Cloud Storage, Cloud Pub/Sub, and BigQuery.',
      'Cloud SQL, Cloud Storage, Cloud Pub/Sub, and Cloud Dataflow.',
      'Cloud Dataproc, Cloud Pub/Sub, Cloud SQL, and Cloud Dataflow.',
      'Cloud Pub/Sub, Compute Engine, Cloud Storage, and Cloud Dataproc.',
    ],
    answer: 'Cloud Dataflow, Cloud Storage, Cloud Pub/Sub, and BigQuery.',
  },
  { 
    question: 'For this question, refer to the Mountkirk Games case study. Mountkirk Games wants to migrate from their current analytics and statistics reporting model to one that meets their technical requirements on Google Cloud Platform. Which two steps should be part of their migration plan? (Choose two.)',
    options: [
      'Evaluate the impact of migrating their current batch ETL code to Cloud Dataflow.',
      'Write a schema migration plan to denormalize data for better performance in BigQuery.',
      'Draw an architecture diagram that shows how to move from a single MySQL database to a MySQL cluster.',
      'Load 10 TB of analytics data from a previous game into a Cloud SQL instance, and run test queries against the full dataset to confirm that they complete successfully.',
      'Integrate Cloud Armor to defend against possible SQL injection attacks in analytics files uploaded to Cloud Storage.',
    ],
    answer: ['Evaluate the impact of migrating their current batch ETL code to Cloud Dataflow.',
            'Write a schema migration plan to denormalize data for better performance in BigQuery.',
    ]
  },
  {
    question: 'For this question, refer to the Mountkirk Games case study. You need to analyze and define the technical architecture for the compute workloads for your company, Mountkirk Games. Considering the Mountkirk Games business and technical requirements, what should you do?',
    options: [
      'Create network load balancers. Use preemptible Compute Engine instances.',
      'Create network load balancers. Use non-preemptible Compute Engine instances.',
      'Create a global load balancer with managed instance groups and autoscaling policies. Use preemptible Compute Engine instances.',
      'Create a global load balancer with managed instance groups and autoscaling policies. Use non-preemptible Compute Engine instances.',    
    ],
    answer: 'Create a global load balancer with managed instance groups and autoscaling policies. Use non-preemptible Compute Engine instances.',
  },
  { 
    question: 'For this question, refer to the Mountkirk Games case study. Mountkirk Games wants to design their solution for the future in order to take advantage of cloud and technology improvements as they become available. Which two steps should they take? (Choose two.)',
    options: [
      'Store as much analytics and game activity data as financially feasible today so it can be used to trainmachine learning models to predict user behavior in the future.',
      'Begin packaging their game backend artifacts in container images and running them on Google Kubernetes Engine to improve the ability to scale up or down based on game activity.',
      'Set up a CI/CD pipeline using Jenkins and Spinnaker to automate canary deployments and improve development velocity.',
      'Adopt a schema versioning tool to reduce downtime when adding new game features that require storing additional player data in the database.',
      'Implement a weekly rolling maintenance process for the Linux virtual machines so they can apply  critical kernel patches and package updates and reduce the risk of 0-day vulnerabilities.',
    ],
    answer: ['Store as much analytics and game activity data as financially feasible today so it can be used to trainmachine learning models to predict user behavior in the future.',
            'Begin packaging their game backend artifacts in container images and running them on Google Kubernetes Engine to improve the ability to scale up or down based on game activity.',
    ]
  },
  {
    question: 'For this question, refer to the Mountkirk Games case study. Mountkirk Games wants you to design a way to test the analytics platform\'s resilience to changes in mobile network latency. What should you do?',
    options: [
      'Deploy failure injection software to the game analytics platform that can inject additional latency to mobile client analytics traffic.',
      'Build a test client that can be run from a mobile phone emulator on a Compute Engine virtual machine, and run multiple copies in Google Cloud Platform regions all over the world to generate realistic traffic.',
      'Add the ability to introduce a random amount of delay before beginning to process analytics files uploaded from mobile devices.',
      'Create an opt-in beta of the game that runs on players mobile devices and collects response times from analytics endpoints running in Google Cloud Platform regions all over the world.',   
     ],
    answer: 'Deploy failure injection software to the game analytics platform that can inject additional latency to mobile client analytics traffic.',
  },
  {
    question: 'For this question, refer to the Mountkirk Games case study. You need to analyze and define the technical architecture for the database workloads for your company, Mountkirk Games. Considering the business and technical requirements, what should you do?',
    options: [
      'Use Cloud SQL for time series data, and use Cloud Bigtable for historical data queries.',
      'Use Cloud SQL to replace MySQL, and use Cloud Spanner for historical data queries.',
      'Use Cloud Bigtable to replace MySQL, and use BigQuery for historical data queries.',
      'Use Cloud Bigtable for time series data, use Cloud Spanner for transactional data, and use BigQuery for historical data queries.',   
     ],
    answer: 'Use Cloud Bigtable for time series data, use Cloud Spanner for transactional data, and use BigQuery for historical data queries.',
  },
  {
    question: 'For this question, refer to the Mountkirk Games case study. Which managed storage option meets Mountkirk\'s technical requirement for storing game activity in a time series database service?',
    options: [
      'Cloud Bigtable.',
      'Cloud Spanner.',
      'BigQuery.',
      'Cloud Datastore.',   
     ],
    answer: 'Cloud Bigtable.',
  },
  {
    question: 'For this question, refer to the Mountkirk Games case study. You are in charge of the new Game Backend Platform architecture. The game communicates with the backend over a REST API. You want to follow Google-recommended practices. How should you design the backend?',
    options: [
      'Create an instance template for the backend. For every region, deploy it on a multi-zone managed instance group. Use an L4 load balancer.',
      'Create an instance template for the backend. For every region, deploy it on a single-zone managed instance group. Use an L4 load balancer.',
      'Create an instance template for the backend. For every region, deploy it on a multi-zone managed instance group. Use an L7 load balancer.',
      'Create an instance template for the backend. For every region, deploy it on a single-zone managed instance group. Use an L7 load balancer.',   
     ],
    answer: 'Create an instance template for the backend. For every region, deploy it on a multi-zone managed instance group. Use an L7 load balancer.',
  },
  {
    question: 'You need to optimize batch file transfers into Cloud Storage for Mountkirk Games\' new Google Cloud solution. The batch files contain game statistics that need to be staged in Cloud Storage and be processed by an extract transform load (ETL) tool. What should you do?',
    options: [
      'Use gsutil to batch move files in sequence.',
      'Use gsutil to batch copy the files in parallel.',
      'Use gsutil to extract the files as the first part of ETL.',
      'Use gsutil to load the files as the last part of ETL.',   
     ],
    answer: 'Use gsutil to batch copy the files in parallel.',
  },
  {
    question: 'You are implementing Firestore for Mountkirk Games. Mountkirk Games wants to give a new game programmatic access to a legacy game\'s Firestore database. Access should be as restricted as possible. What should you do?',
    options: [
      'Create a service account (SA) in the legacy game\'s Google Cloud project, add a second SA in the new game\'s IAM page, and then give the Organization Admin role to both SAs.',
      'Create a service account (SA) in the legacy game\'s Google Cloud project, give the SA the Organization Admin role, and then give it the Firebase Admin role in both projects.',
      'Create a service account (SA) in the legacy game\'s Google Cloud project, add this SA in the new game\'s IAM page, and then give it the Firebase Admin role in both projects.',
      'Create a service account (SA) in the legacy game\'s Google Cloud project, give it the Firebase Admin role, and then migrate the new game to the legacy game\'s project.',   
     ],
    answer: 'Create a service account (SA) in the legacy game\'s Google Cloud project, add this SA in the new game\'s IAM page, and then give it the Firebase Admin role in both projects.',
  },
  {
    question: 'Mountkirk Games wants to limit the physical location of resources to their operating Google Cloud regions. What should you do?',
    options: [
      'Configure an organizational policy which constrains where resources can be deployed.',
      'Configure IAM conditions to limit what resources can be configured.',
      'Configure the quotas for resources in the regions not being used to 0.',
      'Configure a custom alert in Cloud Monitoring so you can disable resources as they are created in other regions.',   
     ],
    answer: 'Configure an organizational policy which constrains where resources can be deployed.',
  },
  {
    question: 'Mountkirk Games wants you to secure the connectivity from the new gaming application platform to Google Cloud. You want to streamline the process and follow Google-recommended practices. What should you do?',
    options: [
      'Configure Workload Identity and service accounts to be used by the application platform.',
      'Use Kubernetes Secrets, which are obfuscated by default. Configure these Secrets to be used by the application platform.',
      'Configure Kubernetes Secrets to store the secret, enable Application-Layer Secrets Encryption, and use Cloud Key Management Service (Cloud KMS) to manage the encryption keys. Configure these Secrets to be used by the application platform.',
      'Configure HashiCorp Vault on Compute Engine, and use customer managed encryption keys and Cloud Key Management Service (Cloud KMS) to manage the encryption keys. Configure these Secrets to be used by the application platform.',   
     ],
    answer: 'Configure Workload Identity and service accounts to be used by the application platform.',
  },
  {
    question: 'The TerramEarth development team wants to create an API to meet the company\'s business requirements. You want the development team to focus their development effort on business value versus creating a custom framework. Which method should they use?',
    options: [
      'Use Google App Engine with Google Cloud Endpoints. Focus on an API for dealers and partners.',
      'Use Google App Engine with a JAX-RS Jersey Java-based framework. Focus on an API for the public.',
      'Use Google App Engine with the Swagger (Open API Specification) framework. Focus on an API for the public.',
      'Use Google Container Engine with a Django Python container. Focus on an API for the public',   
     ],
    answer: 'Use Google App Engine with Google Cloud Endpoints. Focus on an API for dealers and partners.',
  },
  {
    question: 'our development team has created a structured API to retrieve vehicle data. They want to allow third parties to develop tools for dealerships that use this vehicle event data. You want to support delegated authorization against this data. What should you do?',
    options: [
      'Build or leverage an OAuth-compatible access control system.',
      'Build SAML 2.0 SSO compatibility into your authentication system.',
      'Restrict data access based on the source IP address of the partner systems.',
      'Create secondary credentials for each dealer that can be given to the trusted third party.',   
     ],
    answer: 'Build or leverage an OAuth-compatible access control system.',
  },
  {
    question: 'TerramEarth plans to connect all 20 million vehicles in the field to the cloud. This increases the volume to 20 million 600 byte records a second for 40 TB an hour. How should you design the data ingestion?',
    options: [
      'Vehicles write data directly to GCS.',
      'Vehicles write data directly to Google Cloud Pub/Sub.',
      'Vehicles stream data directly to Google BigQuery.',
      'Vehicles continue to write data using the existing system (FTP).',   
     ],
    answer: 'Vehicles write data directly to Google Cloud Pub/Sub.',
  },
  {
    question: 'You analyzed TerramEarth\'s business requirement to reduce downtime, and found that they can achieve a majority of time saving by reducing customer\'s wait time for parts. You decided to focus on reduction of the 3 weeks aggregate reporting time. Which modifications to the companys processes should you recommend?',
    options: [
      'Migrate from CSV to binary format, migrate from FTP to SFTP transport, and develop machine learning analysis of metrics.',
      'Migrate from FTP to streaming transport, migrate from CSV to binary format, and develop machine learning analysis of metrics.',
      'Increase fleet cellular connectivity to 80%, migrate from FTP to streaming transport, and develop machine learning analysis of metrics.',
      'Migrate from FTP to SFTP transport, develop machine learning analysis of metrics, and increase dealer local inventory by a fixed factor.',   
     ],
    answer: 'Increase fleet cellular connectivity to 80%, migrate from FTP to streaming transport, and develop machine learning analysis of metrics.',
  },
  {
    question: 'Which of TerramEarth\'s legacy enterprise processes will experience significant change as a result of increased Google Cloud Platform adoption?',
    options: [
      'Opex/capex allocation, LAN changes, capacity planning.',
      'Capacity planning, TCO calculations, opex/capex allocation.',
      'Capacity planning, utilization measurement, data center expansion.',
      'Data Center expansion, TCO calculations, utilization measurement.',   
     ],
    answer: 'Capacity planning, TCO calculations, opex/capex allocation.',
  },
  {
    question: 'To speed up data retrieval, more vehicles will be upgraded to cellular connections and be able to transmit data to the ETL process. The current FTP process is error-prone and restarts the data transfer from the start of the file when connections fail, which happens often. You want to improve the reliability of the solution and minimize data transfer time on the cellular connections. What should you do?',
    options: [
      'Use one Google Container Engine cluster of FTP servers. Save the data to a Multi-Regional bucket. Run the ETL process using data in the bucket.',
      'Use multiple Google Container Engine clusters running FTP servers located in different regions. Save the data to Multi-Regional buckets in US, EU, and Asia. Run the ETL process using the data in the bucket.',
      'Directly transfer the files to different Google Cloud Multi-Regional Storage bucket locations in US, EU, and Asia using Google APIs over HTTP(S). Run the ETL process using the data in the bucket.',
      'Directly transfer the files to a different Google Cloud Regional Storage bucket location in US, EU, and Asia using Google APIs over HTTP(S). Run the ETL process to retrieve the data from each Regional bucket.',   
     ],
    answer: 'Directly transfer the files to a different Google Cloud Regional Storage bucket location in US, EU, and Asia using Google APIs over HTTP(S). Run the ETL process to retrieve the data from each Regional bucket.',
  },
  {
    question: 'TerramEarth\'s 20 million vehicles are scattered around the world. Based on the vehicle\'s location, its telemetry data is stored in a Google Cloud Storage (GCS) regional bucket (US, Europe, or Asia). The CTO has asked you to run a report on the raw telemetry data to determine why vehicles are breaking down after 100 K miles. You want to run this job on all the data. What is the most cost-effective way to run this job?',
    options: [
      'Move all the data into 1 zone, then launch a Cloud Dataproc cluster to run the job.',
      'Move all the data into 1 region, then launch a Google Cloud Dataproc cluster to run the job.',
      'Launch a cluster in each region to preprocess and compress the raw data, then move the data into a multi-region bucket and use a Dataproc cluster to finish the job.',
      'Launch a cluster in each region to preprocess and compress the raw data, then move the data into a region bucket and use a Cloud Dataproc cluster to finish the job.',   
     ],
    answer: 'Launch a cluster in each region to preprocess and compress the raw data, then move the data into a region bucket and use a Cloud Dataproc cluster to finish the job.',
  },
  {
    question: 'TerramEarth has equipped all connected trucks with servers and sensors to collect telemetry data. Next year they want to use the data to train machine learning models. They want to store this data in the cloudwhile reducing costs. What should they do?',
    options: [
      'Have the vehicle\'s computer compress the data in hourly snapshots, and store it in a Google Cloud Storage (GCS) Nearline bucket.',
      'Push the telemetry data in real-time to a streaming dataflow job that compresses the data, and store it in Google BigQuery.',
      'Push the telemetry data in real-time to a streaming dataflow job that compresses the data, and store it in Cloud Bigtable.',
      'Have the vehicle\'s computer compress the data in hourly snapshots, and store it in a GCS Coldline bucket.',   
     ],
    answer: 'Have the vehicle\'s computer compress the data in hourly snapshots, and store it in a GCS Coldline bucket.',
  },
  {
    question: 'Your agricultural division is experimenting with fully autonomous vehicles. You want your architecture to promote strong security during vehicle operation. Which two architectures should you consider? (Choose two.)',
    options: [
      'Treat every micro service call between modules on the vehicle as untrusted.',
      'Require IPv6 for connectivity to ensure a secure address space.',
      'Use a trusted platform module (TPM) and verify firmware and binaries on boot.',
      'Use a functional programming language to isolate code execution cycles.',   
      'Use multiple connectivity subsystems for redundancy',
      'Enclose the vehicle\'s drive electronics in a Faraday cage to isolate chips.',
    ],
    answer: [
      'Treat every micro service call between modules on the vehicle as untrusted.',
      'Use a trusted platform module (TPM) and verify firmware and binaries on boot.'
    ]
  },

  {
    question: 'You need to implement a network ingress for a new game that meets the defined business and technical requirements. Mountkirk Games wants each regional game instance to be located in multiple Google Cloud regions. What should you do?',
    options: [
      'Configure a global load balancer connected to a managed instance group running Compute Engine instances.',
      'Configure kubemci with a global load balancer and Google Kubernetes Engine.',
      'Configure a global load balancer with Google Kubernetes Engine.',
      'Configure Ingress for Anthos with a global load balancer and Google Kubernetes Engine.',   
    ],
    answer: [
      'Configure Ingress for Anthos with a global load balancer and Google Kubernetes Engine.',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. To be compliant with European GDPR regulation, TerramEarth is required to delete data generated from its European customers after a period of 36 months when it contains personal data. In the new architecture, this data will be stored in both Cloud Storage and BigQuery. What should you do?',
    options: [
      'Create a BigQuery table for the European data, and set the table retention period to 36 months. For Cloud Storage, use gsutil to enable lifecycle management using a DELETE action with an Age condition of 36 months.',
      'Create a BigQuery table for the European data, and set the table retention period to 36 months. For Cloud Storage, use gsutil to create a SetStorageClass to NONE action when with an Age condition of 36 months.',
      'Create a BigQuery time-partitioned table for the European data, and set the partition expiration period to 36 months. For Cloud Storage, use gsutil to enable lifecycle management using a DELETE action with an Age condition of 36 months.',
      'Create a BigQuery time-partitioned table for the European data, and set the partition expiration period to 36 months. For Cloud Storage, use gsutil to create a SetStorageClass to NONE action with an Age condition of 36 months.',   
    ],
    answer: [
      'Create a BigQuery time-partitioned table for the European data, and set the partition expiration period to 36 months. For Cloud Storage, use gsutil to enable lifecycle management using a DELETE action with an Age condition of 36 months.',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. TerramEarth has decided to store data files in Cloud Storage. You need to configure Cloud Storage lifecycle rule to store 1 year of data and minimize file storage cost. Which two actions should you take?',
    options: [
      'Create a Cloud Storage lifecycle rule with Age: "30", Storage Class: "Standard", and Action: "Set to Coldline", and create a second GCS life-cycle rule with Age: "365", Storage Class: "Coldline", and Action: "Delete".',
      'Create a Cloud Storage lifecycle rule with Age: "30", Storage Class: "Coldline", and Action: "Set to Nearline", and create a second GCS life-cycle rule with Age: "91", Storage Class: "Coldline", and Action: "Set to Nearline".',
      'Create a Cloud Storage lifecycle rule with Age: "90", Storage Class: "Standard", and Action: "Set to Nearline", and create a second GCS life-cycle rule with Age: "91", Storage Class: "Nearline", and Action: "Set to Coldline".',
      'Create a Cloud Storage lifecycle rule with Age: "30", Storage Class: "Standard", and Action: "Set to Coldline", and create a second GCS life-cycle rule with Age: "365", Storage Class: "Nearline", and Action: "Delete".',   
    ],
    answer: [
      'Create a Cloud Storage lifecycle rule with Age: "30", Storage Class: "Standard", and Action: "Set to Coldline", and create a second GCS life-cycle rule with Age: "365", Storage Class: "Coldline", and Action: "Delete".',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. You need to implement a reliable, scalable GCP solution for the data warehouse for your company, TerramEarth. Considering the TerramEarth business and technical requirements, what should you do?',
    options: [
      'Replace the existing data warehouse with BigQuery. Use table partitioning.',
      'Replace the existing data warehouse with a Compute Engine instance with 96 CPUs',
      'Replace the existing data warehouse with BigQuery. Use federated data sources.',
      'Replace the existing data warehouse with a Compute Engine instance with 96 CPUs. Add an additional Compute Engine preemptible instance with 32 CPUs.',   
    ],
    answer: [
      'Replace the existing data warehouse with BigQuery. Use table partitioning.',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. A new architecture that writes all incoming data to BigQuery has been introduced. You notice that the data is dirty, and want to ensure data quality on an automated dailybasis while managing cost. What should you do?',
    options: [
      'Set up a streaming Cloud Dataflow job, receiving data by the ingestion process. Clean the data in a Cloud Dataflow pipeline.',
      'Create a Cloud Function that reads data from BigQuery and cleans it. Trigger the Cloud Function from a Compute Engine instance.',
      'Create a SQL statement on the data in BigQuery, and save it as a view. Run the view daily, and save the result to a new table.',
      'Use Cloud Dataprep and configure the BigQuery tables as the source. Schedule a daily job to clean the data.',   
    ],
    answer: [
      'Use Cloud Dataprep and configure the BigQuery tables as the source. Schedule a daily job to clean the data.',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. Considering the technical requirements, how should you reduce the unplanned vehicle downtime in GCP?',
    options: [
      'Use BigQuery as the data warehouse. Connect all vehicles to the network and stream data into BigQuery using Cloud Pub/Sub and Cloud Dataflow. Use Google Data Studio for analysis and reporting.',
      'Use BigQuery as the data warehouse. Connect all vehicles to the network and upload gzip files to a Multi-Regional Cloud Storage bucket using gcloud. Use Google Data Studio for analysis and reporting.',
      'Use Cloud Dataproc Hive as the data warehouse. Upload gzip files to a Multi-Regional Cloud Storage bucket. Upload this data into BigQuery using gcloud. Use Google Data Studio for analysis and reporting.',
      'Use Cloud Dataproc Hive as the data warehouse. Directly stream data into partitioned Hive tables. Use Pig scripts to analyze data.',   
    ],
    answer: [
      'Use BigQuery as the data warehouse. Connect all vehicles to the network and stream data into BigQuery using Cloud Pub/Sub and Cloud Dataflow. Use Google Data Studio for analysis and reporting.',
    ]
  },
  {
    question: 'For this question, refer to the TerramEarth case study. You are asked to design a new architecture for the ingestion of the data of the 200,000 vehicles that are connected to a cellular network. You want to follow Google-recommended practices. Considering the technical requirements, which components should you use for the ingestion of the data?',
    options: [
      'Google Kubernetes Engine with an SSL Ingress.',
      'Cloud IoT Core with public/private key pairs.',
      'Compute Engine with project-wide SSH keys.',
      'Compute Engine with specific SSH keys.',   
    ],
    answer: [
      'Cloud IoT Core with public/private key pairs.',
    ]
  },
];

// Fungsi untuk mengacak array
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Endpoint untuk mendapatkan soal dengan pilihan acak dan urutan soal acak
app.get('/questions', (req, res) => {
  // Acak urutan soal dan pilihan jawaban untuk setiap soal
  const shuffledQuestions = shuffleArray(questions).map(question => ({
    ...question,
    options: shuffleArray(question.options) // Mengacak pilihan jawaban untuk setiap soal
  }));

  res.json(shuffledQuestions);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
