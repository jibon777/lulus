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
    question: '*You support a Node.js application running on Google Kubernetes Engine (GKE) in production. The application makes several HTTP requests to dependent applications. You want to anticipate which dependent applications might cause performance issues. What should you do?*',
    options: [
      'Instrument all applications with Stackdriver Profiler.',
      'Instrument all applications with Stackdriver Trace and review inter-service HTTP requests',
      'Use Stackdriver Debugger to review the execution of logic within each application to instrument all applications.',
      'Modify the Node.js application to log HTTP request and response times to dependent applications. Use Stackdriver Logging to find dependent applications that are performing poorly.',
    ],
    answer: [
      'Instrument all applications with Stackdriver Trace and review inter-service HTTP requests',
    ],
 },
  {
    question: '*Your team needs to create a Google Kubernetes Engine (GKE) cluster to host a newly built application that requires access to third-party services on the internet. Your company does not allow any Compute Engine instance to have a public IP address on Google Cloud. You need to create a deployment strategy that adheres to these guidelines. What should you do?*',
    options: [
      '*Configure the GKE cluster as a private cluster, and configure Cloud NAT Gateway for the cluster subnet*',
      'Configure the GKE cluster as a private cluster. Configure Private Google Access on the Virtual Private Cloud (VPC)',
      'Configure the GKE cluster as a route-based cluster. Configure Private Google Access on the Virtual Private Cloud (VPC)',
      'Create a Compute Engine instance, and install a NAT Proxy on the instance. Configure all workloads on GKE to pass through this proxy to access third-party services on the Internet'
    ],
    answer: '*Configure the GKE cluster as a private cluster, and configure Cloud NAT Gateway for the cluster subnet*',
  },
  {
    question: '*You created a Stackdriver chart for CPU utilization in a dashboard within your workspace project. You want to share the chart with your Site Reliability Engineering (SRE) team only. You want to ensure you follow the principle of least privilege. What should you do?*',
    options: [
      'Share the workspace Project ID with the SRE team. Assign the SRE team the Monitoring Viewer IAM role in the workspace project.',
      'Share the workspace Project ID with the SRE team. Assign the SRE team the Dashboard Viewer IAM role in the workspace project.',
      'Click €גShare chart by URL €גand provide the URL to the SRE team. Assign the SRE team the Monitoring Viewer IAM role in the workspace project.',
      'Click €גShare chart by URL €גand provide the URL to the SRE team. Assign the SRE team the Dashboard Viewer IAM role in the workspace project.'
    ],
    answer: 'Click €גShare chart by URL €גand provide the URL to the SRE team. Assign the SRE team the Monitoring Viewer IAM role in the workspace project.',
  },
  {
    question: '*Your organization wants to implement Site Reliability Engineering (SRE) culture and principles. Recently, a service that you support had a limited outage. A manager on another team asks you to provide a formal explanation of what happened so they can action remediations. What should you do?*',
    options: [
      'Develop a postmortem that includes the root causes, resolution, lessons learned, and a prioritized list of action items. Share it on the engineering organization\'s document portal.',
      'Develop a postmortem that includes the root causes, resolution, lessons learned, and a prioritized list of action items. Share it with the manager only.',
      'Develop a postmortem that includes the root causes, resolution, lessons learned, the list of people responsible, and a list of action items for each person. Share it with the manager only',
      'Develop a postmortem that includes the root causes, resolution, lesso  ns learned, the list of people responsible, and a list of action items for each person. Share it on the engineering organization\'s document portal.'
    ],
    answer: 'Develop a postmortem that includes the root causes, resolution, lessons learned, and a prioritized list of action items. Share it on the engineering organization\'s document portal.',
  },

  {
    question: '*You have a set of applications running on a Google Kubernetes Engine (GKE) cluster, and you are using Stackdriver Kubernetes Engine Monitoring. You are bringing a new containerized application required by your company into production. This application is written by a third party and cannot be modified or reconfigured. The application writes its log information to /var/log/app_messages.log, and you want to send these log entries to Stackdriver Logging. What should you do?*',
    options: [
      'Use the default Stackdriver Kubernetes Engine Monitoring agent configuration.',
      'Install Kubernetes on Google Compute Engine (GCE) and redeploy your applications. Then customize the built-in Stackdriver Logging configuration to tail the log file in the application\'s pods and write to Stackdriver Logging.',
      'Deploy a Fluentd daemonset to GKE. Then create a customized input and output configuration to tail the log file in the application\'s pods and write to Stackdriver Logging.',
      'Write a script to tail the log file within the pod and write entries to standard output. Run the script as a sidecar container with the application\'s pod. Configure a shared volume between the containers to allow the script to have read access to /var/log in the application container.'
    ],
    answer: 'Deploy a Fluentd daemonset to GKE. Then create a customized input and output configuration to tail the log file in the application\'s pods and write to Stackdriver Logging.',
  },
  {
    question: '*You use a multiple step Cloud Build pipeline to build and deploy your application to Google Kubernetes Engine (GKE). You want to integrate with a third-party monitoring platform by performing a HTTP POST of the build information to a webhook. You want to minimize the development effort. What should you do?*',
    options: [
      'Create a Cloud Pub/Sub push subscription to the Cloud Build cloud-builds PubSub topic to HTTP POST the build information to a webhook.',
      'Add logic to each Cloud Build step to HTTP POST the build information to a webhook.',
      'Use Stackdriver Logging to create a logs-based metric from the Cloud Build logs. Create an Alert with a Webhook notification type.',
      'SSH to the VM and execute the following commands on your VM: ps ax | grep fluentd.'
    ],
    answer: 'Create a Cloud Pub/Sub push subscription to the Cloud Build cloud-builds PubSub topic to HTTP POST the build information to a webhook.',
  },
  {
    question: '*You use Spinnaker to deploy your application and have created a canary deployment stage in the pipeline. Your application has an in-memory cache that loads objects at start time. You want to automate the comparison of the canary version against the production version. How should you configure the canary analysis?*',
    options: [
      'Compare the canary with a new deployment of the current production version.',
      'Compare the canary with a new deployment of the previous production version.',
      'Compare the canary with the existing deployment of the current production version.',
      'Compare the canary with the average performance of a sliding window of previous production versions.'
    ],
    answer: 'Compare the canary with a new deployment of the current production version.',
  },
  {
    question: '*You support a high-traffic web application and want to ensure that the home page loads in a timely manner. As a first step, you decide to implement a Service Level Indicator (SLI) to represent home page request latency with an acceptable page load time set to 100 ms. What is the Google-recommended way of calculating this SLI?*',
    options: [
      'Bucketize the request latencies into ranges, and then compute the percentile at 100 ms.',
      'Bucketize the request latencies into ranges, and then compute the median and 90th percentiles.',
      'Count the number of home page request that load in under 100 ms, and then divide by the total number of all web application requests.',
      'Count the number of home page requests that load in under 100 ms, and then divide by the total number of home page requests'
    ],
    answer: 'Count the number of home page requests that load in under 100 ms, and then divide by the total number of home page requests',
  },
  {
    question: '*You deploy a new release of an internal application during a weekend maintenance window when there is minimal user tragic. After the window ends, you learn that one of the new features isn\'t working as expected in the production environment. After an extended outage, you roll back the new release and deploy a fix. You want to modify your release process to reduce the mean time to recovery so you can avoid extended outages in the future. What should you do? (Choose two.)*',
    options: [
      'Before merging new code, require 2 different peers to review the code changes.',
      'Integrate a code linting tool to validate coding standards before any code is accepted into the repository.',
      'Require developers to run automated integration tests on their local development environments before release.',
      'Adopt the blue/green deployment strategy when releasing new code via a CD server.',
      'Configure a CI server. Add a suite of unit tests to your code and have your CI server run them on commit and verify any changes.',
    ],
    answer: ['Adopt the blue/green deployment strategy when releasing new code via a CD server.',
      'Configure a CI server. Add a suite of unit tests to your code and have your CI server run them on commit and verify any changes.',
    ],
  },
  {
    question: '*You have a pool of application servers running on Compute Engine. You need to provide a secure solution that requires the least amount of configuration and allows developers to easily access application logs for troubleshooting. How would you implement the solution on GCP?*',
    options: [
      'Install the gsutil command line tool on your application servers.  €¢גWrite a script using gsutil to upload your application log to a Cloud Storage bucket, and then schedule it to run via cron every 5 minutes.  €¢גGive the developers the IAM Object Viewer access to view the logs in the specified bucket.',
      'Deploy the Stackdriver monitoring agent to the application servers. €¢גGive the developers the IAM Monitoring Viewer role to access Stackdriver and view metrics.',
      'Deploy the Stackdriver logging agent to the application servers.  €¢גGive the developers the IAM Logs Private Logs Viewer role to access Stackdriver and view logs.',
      'Deploy the Stackdriver logging agent to the application servers.  €¢גGive the developers the IAM Logs Viewer role to access Stackdriver and view logs.'
    ],
    answer: 'Deploy the Stackdriver logging agent to the application servers.  €¢גGive the developers the IAM Logs Viewer role to access Stackdriver and view logs.',
  },
  {
    question: '*You support the backend of a mobile phone game that runs on a Google Kubernetes Engine (GKE) cluster. The application is serving HTTP requests from users. You need to implement a solution that will reduce the network cost. What should you do?*',
    options: [
      'Configure the VPC as a Shared VPC Host project.',
      'Configure your network services on the Standard Tier.',
      'Configure your Kubernetes cluster as a Private Cluster.',
      'Configure a Google Cloud HTTP Load Balancer as Ingress.'
    ],
    answer: 'Configure your network services on the Standard Tier.',
  },
  {
    question: '*You encountered a major service outage that affected all users of the service for multiple hours. After several hours of incident management, the service returned to normal, and user access was restored. You need to provide an incident summary to relevant stakeholders following the Site Reliability Engineering recommended practices. What should you do first?*',
    options: [
      'Send the Incident State Document to all the stakeholders',
      'Call individual stakeholders to explain what happened.',
      'Develop a post-mortem to be distributed to stakeholders.',
      'Require the engineer responsible to write an apology email to all stakeholders.'
    ],
    answer: 'Develop a post-mortem to be distributed to stakeholders.',
  },
  {
    question: '*You are performing a semi-annual capacity planning exercise for your flagship service. \
You expect a service user growth rate of 10% month-over-month over the next sixmonths. Your service is fully containerized and runs on Google Cloud Platform (GCP),\
using a Google Kubernetes Engine (GKE) Standard regional cluster on three zones with\
cluster autoscaler enabled. You currently consume about 30% of your total deployed\
CPU capacity, and you require resilience against the failure of a zone. You want to\
ensure that your users experience minimal negative impact as a result of this growth or\
as a result of zone failure, while avoiding unnecessary costs. How should you prepare\
to handle the predicted growth?',
    options: [
      'Verify the maximum node pool size, enable a horizontal pod autoscaler, and\
then perform a load test to verify your expected resource needs.',  
      'Because you are deployed on GKE and are using a cluster autoscaler, your\
GKE cluster will scale automatically, regardless of growth rate.',
      'Because you are at only 30% utilization, you have significant headroom and\
you won\'t need to add any additional capacity for this rate of growth.',
      'Proactively add 60% more node capacity to account for six months of 10%\
growth rate, and then perform a load test to make sure you have enough\
capacity.',
    ],
    answer: 'Verify the maximum node pool size, enable a horizontal pod autoscaler, and\
then perform a load test to verify your expected resource needs.',
  },
  
  {
    question: '*Your application images are built and pushed to Google Container Registry (GCR). You\
want to build an automated pipeline that deploys the application when the image is\
updated while minimizing the development effort. What should you do?*',
    options: [
      'Use Cloud Build to trigger a Spinnaker pipeline.',
      'Use a custom builder in Cloud Build to trigger Jenkins pipeline.',
      'Use Cloud Pub/Sub to trigger a custom deployment service running in Google\
Kubernetes Engine (GKE).',
      'Use Cloud Pub/Sub to trigger a Spinnaker pipeline.',
    ],
    answer: 'Use Cloud Pub/Sub to trigger a Spinnaker pipeline.',
  },
  {
    question: '*Your product is currently deployed in three Google Cloud Platform (GCP) zones with\
your users divided between the zones. You can fail over from one zone to another, but it\
causes a 10-minute service disruption for the affected users. You typically experience a\
database failure once per quarter and can detect it within five minutes. You are\
cataloging the reliability risks of a new real-time chat feature for your product. You\
catalog the following information for each risk:\
* Mean Time to Detect (MTTD) in minutes\
* Mean Time to Repair (MTTR) in minutes\
* Mean Time Between Failure (MTBF) in days\
* User Impact Percentage\
The chat feature requires a new database system that takes twice as long to\
successfully fail over between zones. You want to account for the risk of the new\
database failing in one zone. What would be the values for the risk of database failover\
with the new system?*',
    options: [
      'MTTD: 5 MTTR: 10 MTBF: 90 Impact: 33%',
      'MTTD: 5 MTTR: 20 MTBF: 90 Impact: 33%',
      'MTTD: 5 MTTR: 10 MTBF: 90 Impact: 50%',
      'MTTD: 5 MTTR: 20 MTBF: 90 Impact: 50%'
    ],
    answer: 'MTTD: 5 MTTR: 20 MTBF: 90 Impact: 33%'
  },

  {
    question: '*You are managing the production deployment to a set of Google Kubernetes Engine\
(GKE) clusters. You want to make sure only images which are successfully built by your\
trusted CI/CD pipeline are deployed to production. What should you do?*',
    options: [
      'Enable Cloud Security Scanner on the clusters.',
      'Enable Vulnerability Analysis on the Container Registry.',
      'Set up the Kubernetes Engine clusters as private clusters.',
      'Set up the Kubernetes Engine clusters with Binary Authorization.'
    ],
    answer: 'Set up the Kubernetes Engine clusters with Binary Authorization.'
  },

  {
    question: '*You support an e-commerce application that runs on a large Google Kubernetes Engine\
(GKE) cluster deployed on-premises and on Google Cloud Platform. The application\
consists of microservices that run in containers. You want to identify containers that are\
using the most CPU and memory. What should you do?*',
    options: [
      'Use Stackdriver Kubernetes Engine Monitoring.',
      'Use Prometheus to collect and aggregate logs per container, and then analyze the results in Grafana.',
      'Use the Stackdriver Monitoring API to create custom metrics, and then organize your containers using groups.',
      'Use Stackdriver Logging to export application logs to BigQuery, aggregate logs per container, and then analyze CPU and memory consumption.',
      ],
      answer: [
        'Set up a filter in Cloud Logging and a Cloud Storage bucket as an export target for the logs you want to save.',
      ],
  },
  {
      question: '*Your company experiences bugs, outages, and slowness in its production systems.\
Developers use the production environment for new feature development and bug fixes.\
Configuration and experiments are done in the production environment, causing\
outages for users. Testers use the production environment for load testing, which often\
slows the production systems. You need to redesign the environment to reduce the\
number of bugs and outages in production and to enable testers to toad test new\
features. What should you do?*',
      options: [
        'Create a development environment for writing code and a test environment for\
configurations, experiments, and load testing.',
        'Secure the production environment to ensure that developers can\'t change it\
and set up one controlled update per year.',
        'Create a development environment with smaller server capacity and give\
access only to developers and testers.',
        'Create an automated testing script in production to detect failures as soon as\
they occur.',
      ],
      answer: [
        'Create a development environment for writing code and a test environment for\
configurations, experiments, and load testing.',
      ],  
   },

   { 
    question: '*You support an application running on App Engine. The application is used globally and\
accessed from various device types. You want to know the number of connections. You\
are using Stackdriver Monitoring for App Engine. What metric should you use?*',
    options: [
      'flex/connections/current',
      'tcp_ssl_proxy/new_connections',
      'tcp_ssl_proxy/open_connections',
      'flex/instance/connections/current',
    ],
    answer: 'flex/connections/current'
    }, 

    { 
      question: '*You support an application deployed on Compute Engine. The application connects to a\
Cloud SQL instance to store and retrieve data. After an update to the application, users\
report errors showing database timeout messages. The number of concurrent active\
users remained stable. You need to find the most probable cause of the database\
timeout. What should you do?*',
      options: [
        'Check the serial port logs of the Compute Engine instance.',
        'Use Stackdriver Profiler to visualize the resources utilization throughout the\
application.',
        'Determine whether there is an increased number of connections to the Cloud\
SQL instance.',
        'Use Cloud Security Scanner to see whether your Cloud SQL is under a\
Distributed Denial of Service (DDoS) attack.',
      ],
      answer: 'Use Stackdriver Profiler to visualize the resources utilization throughout the\
application.'
    }, 
    
    { 
      question: '*Your application images are built using Cloud Build and pushed to Google Container\
Registry (GCR). You want to be able to specify a particular version of your application\
for deployment based on the release version tagged in source control. What should you\
do when you push the image?',
      options: [
        'Reference the image digest in the source control tag.',
        'Supply the source control tag as a parameter within the image name.',
        'Use Cloud Build to include the release version tag in the application image.',
        'Use GCR digest versioning to match the image to the tag in source control.',
      ],
      answer: 'Use Cloud Build to include the release version tag in the application image.'
    }, 

    { 
      question: '*You are on-call for an infrastructure service that has a large number of dependent\
systems. You receive an alert indicating that the service is failing to serve most of its\
requests and all of its dependent systems with hundreds of thousands of users are\
affected. As part of your Site Reliability Engineering (SRE) incident management\
protocol, you declare yourself Incident Commander (IC) and pull in two experiencedpeople from your team as Operations Lead (OL) and\
Communications Lead (CL). What should you do next?*',
      options: [
        'Look for ways to mitigate user impact and deploy the mitigations to production.',
        'Contact the affected service owners and update them on the status of the incident.',
        'Establish a communication channel where incident responders and leads can communicate with each other.',
        'Start a postmortem, add incident information, circulate the draft internally, and ask internal stakeholders for input.',
      ],
      answer: 'Establish a communication channel where incident responders and leads can communicate with each other.'
    }, 
    {      
      question: '*You are developing a strategy for monitoring your Google Cloud Platform (GCP)\
projects in production using Stackdriver Workspaces. One of the requirements is to be\
able to quickly identify and react to production environment issues without false alerts\
from development and staging projects. You want to ensure that you adhere to the\
principle of least privilege when providing relevant team members with access to\
Stackdriver Workspaces. What should you do?*',
      options: [
        'Grant relevant team members read access to all GCP production projects.\
Create Stackdriver workspaces inside each project.',
        'Grant relevant team members the Project Viewer IAM role on all GCP\
production projects. Create Stackdriver workspaces inside each project.',
        'Choose an existing GCP production project to host the monitoring workspace.\
Attach the production projects to this workspace. Grant relevant team members\
read access to the Stackdriver Workspace.',
        'Create a new GCP monitoring project and create a Stackdriver Workspace\
inside it. Attach the production projects to this workspace. Grant relevant team\
members read access to the Stackdriver Workspace.',
      ],
      answer: 'Create a new GCP monitoring project and create a Stackdriver Workspace\
inside it. Attach the production projects to this workspace. Grant relevant team\
members read access to the Stackdriver Workspace.'
    }, 
        {      
      question: '*You currently store the virtual machine (VM) utilization logs in Stackdriver. You need to\
provide an easy-to-share interactive VM utilization dashboard that is updated in real\
time and contains information aggregated on a quarterly basis. You want to use Google\
Cloud Platform solutions. What should you do?*',
      options: [
        '1. Export VM utilization logs from Stackdriver to BigQuery. 2. Create a\
dashboard in Data Studio. 3. Share the dashboard with your stakeholders.',
        '1. Export VM utilization logs from Stackdriver to Cloud Pub/Sub. 2. From\
Cloud Pub/Sub, send the logs to a Security Information and Event Management\
(SIEM) system. 3. Build the dashboards in the SIEM system and share with your\
stakeholders.',
        '1. Export VM utilization logs from Stackdriver to BigQuery. 2. From BigQuery,\
export the logs to a CSV file. 3. Import the CSV file into Google Sheets. 4. Build a\
dashboard in Google Sheets and share it with your stakeholders.',
        '1. Export VM utilization logs from Stackdriver to a Cloud Storage bucket. 2.\
Enable the Cloud Storage API to pull the logs programmatically. 3. Build a\
custom data visualization application. 4. Display the pulled logs in a custom\
dashboard.',
      ],
      answer: '1. Export VM utilization logs from Stackdriver to BigQuery. 2. Create a\
dashboard in Data Studio. 3. Share the dashboard with your stakeholders.'
    }, 
 {      
      question: '*You need to run a business-critical workload on a fixed set of Compute Engine\
instances for several months. The workload is stable with the exact amount of\
resources allocated to it. You want to lower the costs for this workload without any\
performance implications. What should you do??*',
      options: [
        'Purchase Committed Use Discounts.',
        'Migrate the instances to a Managed Instance Group.',
        'Convert the instances to preemptible virtual machines.',
        'Create an Unmanaged Instance Group for the instances used to run the workload.',
      ],
      answer: 'Purchase Committed Use Discounts.'
    }, 
 {      
      question: '*You are part of an organization that follows SRE practices and principles. You are taking\
over the management of a new service from the Development Team, and you conduct a\
Production Readiness Review (PRR). After the PRR analysis phase, you determine that\
the service cannot currently meet its Service Level\
Objectives (SLOs). You want to ensure that the service can meet its SLOs in production.\
What should you do next?*',
      options: [
        'Adjust the SLO targets to be achievable by the service so you can bring it into production.',
        'Notify the development team that they will have to provide production support for the service.',
        'Identify recommended reliability improvements to the service to be completed before handover.',
        'Bring the service into production with no SLOs and build them when you have collected operational data.',
      ],
      answer: 'Identify recommended reliability improvements to the service to be completed before handover.'
    }, 
 {      
      question: '*You are running an experiment to see whether your users like a new feature of a web\
application. Shortly after deploying the feature as a canary release, you receive a spike\
in the number of 500 errors sent to users, and your monitoring reports show increasedlatency. You want to quickly minimize the negative impact on users. What should you do\
first?*',
      options: [
        'Roll back the experimental canary release.',
        'Start monitoring latency, traffic, errors, and saturation.',
        'Record data for the postmortem document of the incident.',
        'Trace the origin of 500 errors and the root cause of increased latency.',
      ],
      answer: 'Roll back the experimental canary release.'
    }, 
 {      
      question: '*You are responsible for creating and modifying the Terraform templates that define your\
Infrastructure. Because two new engineers will also be working on the same code, you\
need to define a process and adopt a tool that will prevent you from overwriting each\
other\'s code. You also want to ensure that you capture all updates in the latest version.\
What should you do?*',
      options: [
        'Store your code in a Git-based version control system. Establish a\
process that allows developers to merge their own changes at the end of each\
day. Package and upload code to a versioned Cloud Storage basket as the\
latest master version.',
        'Store your code in a Git-based version control system. Establish a\
process that includes code reviews by peers and unit testing to ensure integrity\
and functionality before integration of code. Establish a process where the\
fully integrated code in the repository becomes the latest master version.',
        'Store your code as text files in Google Drive in a defined folder structure\
that organizes the files. At the end of each day, confirm that all changes have\
been captured in the files within the folder structure. name the folder\
structure with a predefined naming convention that increments the version.',
        'Store your code as text files in Google Drive in a defined folder structure\
that organizes the files. At the end of each day, confirm that all changes have\
been captured in the files within the folder structure and create a new .zip archivewith a predefined naming convention. Upload the .zip archive to a versioned\
Cloud Storage bucket and accept it as the latest version.',
      ],
      answer: 'Store your code in a Git-based version control system. Establish a\
process that includes code reviews by peers and unit testing to ensure integrity\
and functionality before integration of code. Establish a process where the\
fully integrated code in the repository becomes the latest master version.'
    }, 
 {      
      question: '*You support a high-traffic web application with a microservice architecture. The home\
page of the application displays multiple widgets containing content such as the current\
weather, stock prices, and news headlines. The main serving thread makes a call to a\
dedicated microservice for each widget and then lays out the homepage for the user.\
The microservices occasionally fail; when that happens, the serving thread serves the\
homepage with some missing content. Users of the application are unhappy if this\
degraded mode occurs too frequently, but they would rather have some content served\
instead of no content at all. You want to set a Service Level Objective (SLO) to ensure\
that the user experience does not degrade too much. What Service Level Indicator (SLI)\
should you use to measure this?*',
      options: [
        'A quality SLI: the ratio of non-degraded responses to total responses.',
        'An availability SLI: the ratio of healthy microservices to the total number of microservices.',
        'A freshness SLI: the proportion of widgets that have been updated within the last 10 minutes.',
        'A latency SLI: the ratio of microservice calls that complete in under 100 ms to the total number of microservice calls.',
      ],
      answer: 'A quality SLI: the ratio of non-degraded responses to total responses.'
    }, 
 {      
      question: '*You support a multi-region web service running on Google Kubernetes Engine (GKE)\
behind a Global HTTP/S Cloud Load Balancer (CLB). For legacy reasons, user\
requests first go through a third-party Content Delivery Network (CDN), which then\
routes traffic to the CLB. You have already implemented an availabilityService Level Indicator (SLI) at the CLB level. However, you want to increase coverage\
in case of a potential load balancer misconfiguration, CDN failure, or other global\
networking catastrophe. Where should you measure this new SLI? (Choose two.)*',
      options: [
        'Your application servers\' logs.',
        'Instrumentation coded directly in the client.',
        'Metrics exported from the application servers.',
        'GKE health checks for your application servers.',
        'A synthetic client that periodically sends simulated user requests.',
      ],
      answer: ['Instrumentation coded directly in the client.','A synthetic client that periodically sends simulated user requests.']

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
