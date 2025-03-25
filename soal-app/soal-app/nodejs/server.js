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
      question: 'You are helping the QA team to roll out a new load-testing tool to test the scalability of your primary cloud services that run on Google Compute Engine with Cloud Bigtable. Which three requirements should they include? (Choose three.)',
      options: [
        'Ensure that the load tests validate the performance of Cloud Bigtable.',
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
    question: 'Your company places a high value on being responsive and meeting customer needs quickly. Their primary business objectives are release speed and agility. You want to reduce the chance of security errors being accidentally introduced. Which two actions can you take? (Choose two.)',
    options: [
      'Ensure every code check-in is peer reviewed by a security SME',
      'Use source code security analyzers as part of the CI/CD pipeline',
      'Ensure you have stubs to unit test all interfaces between components',
      'Enable code signing and a trusted binary repository integrated with your CI/CD pipeline',
      'Run a vulnerability security scanner as part of your continuous-integration /continuous-delivery (CI/CD) pipeline',
      ],
  },

  {
      answer: [
        'Use source code security analyzers as part of the CI/CD pipeline',
        'Run a vulnerability security scanner as part of your continuous-integration /continuous-delivery (CI/CD) pipeline',
      ],
      question: 'Your company just finished a rapid lift and shift to Google Compute Engine for your compute needs. You have another 9 months to design and deploy a more cloud-native solution. Specifically, you want a system that is no-ops and auto-scaling. Which two compute products should you choose? (Choose two.)?',
      options: [
        'Compute Engine with containers.',
        'Google Kubernetes Engine with containers.',
        'Google App Engine Standard Environment',
        'Connect to the GCE instance using project SSH keys. Identify previous logins in system logs, and match these with the project owners list.',
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
      'Configure an organization policy to block creation of service accounts.',
      'Configure Cloud Scheduler to trigger a Cloud Function every hour that removes all users that dont belong to the Cloud Identity domain from all projects.',
      'Create a technical user (e.g., crawler@yourdomain.com), and give it the project owner role at root organization level. Write a bash script that:  ¢€גLists all the IAM rules of all projects within the organization. ¢€ג Deletes all users that do not belong to the company domain. Create a Compute Engine instance in a project within the Organization and configure gcloud to be executed with technical user credentials. Configure a cron job that executes the bash script every hour.',
    ],
    answer: 'Configure an organization policy to restrict identities by domain.',
  },    
  {
    question: 'Your company has a Google Cloud project that uses BigQuery for data warehousing. There are some tables that contain personally identifiable information (PII). Only the compliance team may access the PII. The other information in the tables must be available to the data science team. You want to minimize cost and the time it takes to assign appropriate access to the tables. What should you do?',
    options: [
      '1. From the dataset where you have the source data, create views of tables that you want to share, excluding PII. 2. Assign an appropriate project-level IAM role to the members of the data science team. 3. Assign access controls to the dataset that contains the view',  
      '1. From the dataset where you have the source data, create materialized views of tables that you want to share, excluding PII. 2. Assign an appropriate project-level IAM role to the members of the data science team. 3. Assign access controls to the dataset that contains the view',
      '1. Create a dataset for the data science team. 2. Create views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset',
      '1. Create a dataset for the data science team. 2. Create materialized views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset.',
    ],
    answer: '1. Create a dataset for the data science team. 2. Create views of tables that you want to share, excluding PII. 3. Assign an appropriate project-level IAM role to the members of the data science team. 4. Assign access controls to the dataset that contains the view. 5. Authorize the view to access the source dataset.',
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
    answer: 'Set up a Cloud Monitoring sink that triggers the Cloud Function after an instance removal log message arrives in Cloud Logging',
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
    answer: 'Configure SSH port forwarding on each application to provide connectivity between applications in the different Shared VPCs.',
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
