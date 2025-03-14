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
    question: 'One of your primary business objectives is being able to trust the data stored in your application. You want to log all changes to the application data. How can you design your logging system to verify authenticity of your logs?',
    options: [
      'Write the log concurrently in the cloud and on premises.',
      'Use a SQL database and limit who can modify the log table.',
      'Digitally sign each timestamp and log entry and store the signature.',
      'Create a JSON dump of each log entry and store it in Google Cloud Storage.',
    ],
    answer: 'Digitally sign each timestamp and log entry and store the signature.'
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
