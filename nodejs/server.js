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
 {      
      question: '*Your team is designing a new application for deployment into Google Kubernetes\
Engine (GKE). You need to set up monitoring to collect and aggregate various\
application-level metrics in a centralized location. You want to use Google Cloud\
Platform services while minimizing the amount of work required to set up monitoring.\
What should you do?*',
      options: [
        'Publish various metrics from the application directly to the Stackdriver Monitoring API, and then observe these custom metrics in Stackdriver.',
        'Install the Cloud Pub/Sub client libraries, push various metrics from the\
application to various topics, and then observe the aggregated metrics in\
Stackdriver.',
        'Install the OpenTelemetry client libraries in the application, configure\
Stackdriver as the export destination for the metrics, and then observe the\
application\'s metrics in Stackdriver.',
        'A latency SLI: the ratio of microservice calls that complete in under 100 ms to the total number of microservice calls.',
      ],
      answer: 'Publish various metrics from the application directly to the Stackdriver Monitoring API, and then observe these custom metrics in Stackdriver.'
    },
 {      
      question: '*You support a production service that runs on a single Compute Engine instance. You\
regularly need to spend time on recreating the service by deleting the crashing instance\
and creating a new instance based on the relevant image. You want to reduce the time\
spent performing manual operations while following Site\
Reliability Engineering principles. What should you do?*',
      options: [
        'File a bug with the development team so they can find the root cause of the\
crashing instance.',
        'Create a Managed instance Group with a single instance and use health\
checks to determine the system status.',
        'Add a Load Balancer in front of the Compute Engine instance and use health\
checks to determine the system status.',
        'Create a Stackdriver Monitoring dashboard with SMS alerts to be able to start\
recreating the crashed instance promptly after it was crashed.',
      ],
      answer: 'Create a Managed instance Group with a single instance and use health\
checks to determine the system status.'
    },
{      
      question: '*Your application artifacts are being built and deployed via a CI/CD pipeline. You want\
the CI/CD pipeline to securely access application secrets. You also want to more easily\
rotate secrets in case of a security breach. What should you do?*',
      options: [
        'Prompt developers for secrets at build time. Instruct developers to not store\
secrets at rest.',
        'Store secrets in a separate configuration file on Git. Provide select developers\
with access to the configuration file.',
        'Store secrets in Cloud Storage encrypted with a key from Cloud KMS. Provide\
the CI/CD pipeline with access to Cloud KMS via IAM.',
        'Encrypt the secrets and store them in the source code repository. Store a\
decryption key in a separate repository and grant your pipeline access to it.',
      ],
      answer: 'Store secrets in Cloud Storage encrypted with a key from Cloud KMS. Provide\
the CI/CD pipeline with access to Cloud KMS via IAM.'
    },
{      
      question: '*Your company follows Site Reliability Engineering practices. You are the person in\
charge of Communications for a large, ongoing incident affecting your customer-facing\
applications. There is still no estimated time for a resolution of the outage. You are\
receiving emails from internal stakeholders who want updates on the outage, as well as\
emails from customers who want to know what is happening. You want to efficiently\
provide updates to everyone affected by the outage.\
What should you do?*',
      options: [
        'Focus on responding to internal stakeholders at least every 30 minutes. Commit to €גnext update €גtimes.',
        'Provide periodic updates to all stakeholders in a timely manner. Commit to a €גnext update €גtime in all communications.',
        'Delegate the responding to internal stakeholder emails to another member of\
the Incident Response Team. Focus on providing responses directly to\
customers.',
        'Provide all internal stakeholder emails to the Incident Commander, and allow\
them to manage internal communications. Focus on providing responses directly\
to customers.',
      ],
      answer: 'Provide periodic updates to all stakeholders in a timely manner. Commit to a €גnext update €גtime in all communications.'
    },
{      
      question: '*Your team uses Cloud Build for all CI/CD pipelines. You want to use the kubectl builder\
for Cloud Build to deploy new images to Google Kubernetes Engine\
(GKE). You need to authenticate to GKE while minimizing development effort. What\
should you do?*',
      options: [
        'Assign the Container Developer role to the Cloud Build service account.',
        'Specify the Container Developer role for Cloud Build in the cloudbuild.yaml file.',
        'Create a new service account with the Container Developer role and use it to run Cloud Build.',
        'Create a separate step in Cloud Build to retrieve service account credentials and pass these to kubectl.',
      ],
      answer: 'Assign the Container Developer role to the Cloud Build service account.'
    },
{      
      question: '*You support an application that stores product information in cached memory. For every\
cache miss, an entry is logged in Stackdriver Logging. You want to visualize how often a\
cache miss happens over time. What should you do?*',
      options: [
        'Link Stackdriver Logging as a source in Google Data Studio. Filter the logs on the cache misses.',
        'Configure Stackdriver Profiler to identify and visualize when the cache misses occur based on the logs.',
        'Create a logs-based metric in Stackdriver Logging and a dashboard for that metric in Stackdriver Monitoring.',
        'Configure BigQuery as a sink for Stackdriver Logging. Create a scheduled query to filter the cache miss logs and write them to a separate table.',
      ],
      answer: 'Create a logs-based metric in Stackdriver Logging and a dashboard for that metric in Stackdriver Monitoring.'
    },
{      
      question: '*You need to deploy a new service to production. The service needs to automatically\
scale using a Managed Instance Group (MIG) and should be deployed over multipleregions. The service needs a large number of resources for each instance and you\
need to plan for capacity. What should you do?*',
      options: [
        'Use the n1-highcpu-96 machine type in the configuration of the MIG.',
        'Monitor results of Stackdriver Trace to determine the required amount of resources.',
        'Validate that the resource requirements are within the available quota limits of each region.',
        'Deploy the service in one region and use a global load balancer to route traffic to this region.',
      ],
      answer: 'Create a logs-based metric in Stackdriver Logging and a dashboard for that metric in Stackdriver Monitoring.'
    },
{      
      question: '*You are running an application on Compute Engine and collecting logs through\
Stackdriver. You discover that some personally identifiable information (PII) is leaking\
into certain log entry fields. All PII entries begin with the text userinfo. You want to\
capture these log entries in a secure location for later review and prevent them from\
leaking to Stackdriver Logging. What should you do?*',
      options: [
        'Create a basic log filter matching userinfo, and then configure a log export in the Stackdriver console with Cloud Storage as a sink.',
        'Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, and then copy the entries to a Cloud Storage bucket.',
        'Create an advanced log filter matching userinfo, configure a log export in the Stackdriver console with Cloud Storage as a sink, and then configure a log exclusion with userinfo as a filter.',
        'Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, create an advanced log filter matching userinfo, and then configure a log export in the Stackdriver console with Cloud Storage as a sink.',
      ],
      answer: 'Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, and then copy the entries to a Cloud Storage bucket.'
    },
{      
      question: '*You have a CI/CD pipeline that uses Cloud Build to build new Docker images and push\
them to Docker Hub. You use Git for code versioning. After making a change in the\
Cloud Build YAML configuration, you notice that no new artifacts are being built by the\
pipeline. You need to resolve the issue following Site\
Reliability Engineering practices. What should you do?*',
      options: [
        'Disable the CI pipeline and revert to manually building and pushing the artifacts.',
        'Change the CI pipeline to push the artifacts is Container Registry instead of Docker Hub.',
        'Upload the configuration YAML file to Cloud Storage and use Error Reporting to identify and fix the issue.',
        'Run a Git compare between the previous and current Cloud Build Configuration files to find and fix the bug.',
      ],
      answer: 'Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, and then copy the entries to a Cloud Storage bucket.'
    },
{      
      question: '*Your company follows Site Reliability Engineering principles. You are writing a\
postmortem for an incident, triggered by a software change, that severely affected\
users. You want to prevent severe incidents from happening in the future. What should\
you do?*',
      options: [
        'Identify engineers responsible for the incident and escalate to their senior management.',
        'Ensure that test cases that catch errors of this type are run successfully before new software releases.',
        'Follow up with the employees who reviewed the changes and prescribe practices they should follow in the future.',
        'Design a policy that will require on-call teams to immediately call engineers and management to discuss a plan of action if an incident occurs.',
      ],
      answer: 'Ensure that test cases that catch errors of this type are run successfully before new software releases.'
    },
  {
    question: 'You support a high-traffic web application that runs on Google Cloud Platform (GCP).\
You need to measure application reliability from a user perspective without making any\
engineering changes to it. What should you do? (Choose two.)',
    options: [
      'Review current application metrics and add new ones as needed.',
      'Modify the code to capture additional information for user interaction.',
      'Analyze the web proxy logs only and capture response time of each request.',
      'Create new synthetic clients to simulate a user journey using the application.',
      'Use current and historic Request Logs to trace customer interaction with the application.',
    ],
    answer: ['Create new synthetic clients to simulate a user journey using the application.',
      'Use current and historic Request Logs to trace customer interaction with the application.',
    ],
  },
{      
      question: 'You manage an application that is writing logs to Stackdriver Logging. You need to give\
some team members the ability to export logs. What should you do?',
      options: [
        'Grant the team members the IAM role of logging.configWriter on Cloud IAM.',
        'Configure Access Context Manager to allow only these members to export logs.',
        'Create and grant a custom IAM role with the permissions logging.sinks.list and logging.sink.get.',
        'Create an Organizational Policy in Cloud IAM to allow only these members to create log exports.',
      ],
      answer: 'Grant the team members the IAM role of logging.configWriter on Cloud IAM.'
    },
  {      
      question: 'Your application services run in Google Kubernetes Engine (GKE). You want to make\
sure that only images from your centrally-managed Google Container\
Registry (GCR) image registry in the altostrat-images project can be deployed to the\
cluster while minimizing development time. What should you do?',
      options: [
        'Create a custom builder for Cloud Build that will only push images to gcr.io/altostrat-images.',
        'Use a Binary Authorization policy that includes the whitelist name pattern gcr.io/altostrat-images/.',
        'Add logic to the deployment pipeline to check that all manifests contain only images from gcr.io/altostrat-images.',
        'Add a tag to each image in gcr.io/altostrat-images and check that this tag is present when the image is deployed.',
      ],
      answer: 'Use a Binary Authorization policy that includes the whitelist name pattern   gcr.io/altostrat-images/.'
    },
  {      
      question: 'Your team has recently deployed an NGINX-based application into Google Kubernetes\
Engine (GKE) and has exposed it to the public via an HTTP Google Cloud\
Load Balancer (GCLB) ingress. You want to scale the deployment of the application\'s frontend using an appropriate Service Level Indicator (SLI). What should you do?' ,
      options: [
        'Configure the horizontal pod autoscaler to use the average response time from the Liveness and Readiness probes.',
        'Configure the vertical pod autoscaler in GKE and enable the cluster autoscaler to scale the cluster as pods expand.',
        'Install the Stackdriver custom metrics adapter and configure a horizontal pod autoscaler to use the number of requests provided by the GCLB.',
        'Expose the NGINX stats endpoint and configure the horizontal pod autoscaler to use the request metrics exposed by the NGINX deployment.',
      ],
      answer: 'Install the Stackdriver custom metrics adapter and configure a horizontal pod autoscaler to use the number of requests provided by the GCLB.'
    },
  {
    question: 'Your company follows Site Reliability Engineering practices. You are the Incident\
Commander for a new, customer-impacting incident. You need to immediately assign\
two incident management roles to assist you in an effective incident response. What\
roles should you assign? (Choose two.)',
    options: [
      'Operations Lead',
      'Engineering Lead',
      'Communications Lead',
      'Customer Impact Assessor',
      'External Customer Communications Lead',
    ],
    answer: ['Operations Lead', 
      'Communications Lead',
    ],
  },
  {      
      question: 'You support an application running on GCP and want to configure SMS notifications to\
your team for the most critical alerts in Stackdriver Monitoring. You have already\
identified the alerting policies you want to configure this for. What should you do?' ,
      options: [
        'Download and configure a third-party integration between Stackdriver\
Monitoring and an SMS gateway. Ensure that your team members add their\
SMS/phone numbers to the external tool.',
        'Select the Webhook notifications option for each alerting policy, and configure\
it to use a third-party integration tool. Ensure that your team members add their\
SMS/phone numbers to the external tool.',
        'Ensure that your team members set their SMS/phone numbers in their\
Stackdriver Profile. Select the SMS notification option for each alerting policy and\
then select the appropriate SMS/phone numbers from the list.',
        'Configure a Slack notification for each alerting policy. Set up a Slack-to-SMS\
integration to send SMS messages when Slack messages are received. Ensure\
that your team members add their SMS/phone numbers to the external\
integration.',
      ],
      answer: 'Ensure that your team members set their SMS/phone numbers in their\
Stackdriver Profile. Select the SMS notification option for each alerting policy and\
then select the appropriate SMS/phone numbers from the list.'
    },
  {      
      question: 'You are managing an application that exposes an HTTP endpoint without using a load\
balancer. The latency of the HTTP responses is important for the user experience. You\
want to understand what HTTP latencies all of your users are experiencing. You use\
Stackdriver Monitoring. What should you do?' ,
      options: [
        'In your application, create a metric with a metricKind set to DELTA and a\
valueType set to DOUBLE.  €¢גIn Stackdriver\'s Metrics Explorer, use a Stacked\
Bar graph to visualize the metric',
        'In your application, create a metric with a metricKind set to CUMULATIVE\
and a valueType set to DOUBLE.  €¢גIn Stackdriver\'s Metrics Explorer, use a\
Line graph to visualize the metric.',
        'In your application, create a metric with a metricKind set to GAUGE and a\
valueType set to DISTRIBUTION.  €¢גIn Stackdriver\'s Metrics Explorer, use a\
Heatmap graph to visualize the metric.',
        'In your application, create a metric with a metricKind set to\
METRIC_KIND_UNSPECIFIED and a valueType set to INT64.  €¢גIn\
Stackdriver\'s Metrics Explorer, use a Stacked Area graph to visualize the metric.',
      ],
      answer: 'In your application, create a metric with a metricKind set to GAUGE and a\
valueType set to DISTRIBUTION.  €¢גIn Stackdriver\'s Metrics Explorer, use a\
Heatmap graph to visualize the metric.'
    },
  {      
      question: 'Your team is designing a new application for deployment both inside and outside\
Google Cloud Platform (GCP). You need to collect detailed metrics such as system\
resource utilization. You want to use centralized GCP services while minimizing the\
amount of work required to set up this collection system. What should you do?' ,
      options: [
        'Import the Stackdriver Profiler package, and configure it to relay function timing data to Stackdriver for further analysis.',
        'Import the Stackdriver Debugger package, and configure the application to emit debug messages with timing information.',
        'Instrument the code using a timing library, and publish the metrics via a health check endpoint that is scraped by Stackdriver.',
        'Install an Application Performance Monitoring (APM) tool in both locations, and configure an export to a central data storage location for analysis.',
      ],
      answer: 'Import the Stackdriver Profiler package, and configure it to relay function timing data to Stackdriver for further analysis.'
    },
  {      
      question: 'You need to reduce the cost of virtual machines (VM) for your organization. After\
reviewing different options, you decide to leverage preemptible VM instances.\
Which application is suitable for preemptible VMs?' ,
      options: [
        'A scalable in-memory caching system.',
        'The organization\'s public-facing website.',
        'A distributed, eventually consistent NoSQL database cluster with sufficient quorum.',
        'A GPU-accelerated video rendering platform that retrieves and stores videos in a storage bucket.',
      ],
      answer: 'A scalable in-memory caching system.'
    },
  {      
      question: '*Your organization recently adopted a container-based workflow for application\
development. Your team develops numerous applications that are deployed\
continuously through an automated build pipeline to a Kubernetes cluster in the\
production environment. The security auditor is concerned that developers or operators\
could circumvent automated testing and push code changes to production without\
approval. What should you do to enforce approvals?*' ,
      options: [
        'Configure the build system with protected branches that require pull request approval.',
        'Use an Admission Controller to verify that incoming requests originate from approved sources.',
        'Leverage Kubernetes Role-Based Access Control (RBAC) to restrict access to only approved users.',
        'Enable binary authorization inside the Kubernetes cluster and configure the build pipeline as an attestor.',
      ],
      answer: 'Enable binary authorization inside the Kubernetes cluster and configure the build pipeline as an attestor.'
    },
  {      
      question: '*You support a stateless web-based API that is deployed on a single Compute Engine\
instance in the europe-west2-a zone. The Service Level Indicator (SLI) for service\
availability is below the specified Service Level Objective (SLO). A postmortem has\
revealed that requests to the API regularly time out. The time outs are due to the API\
having a high number of requests and running out memory. You want to improve service\
availability. What should you do?*' ,
      options: [
        'Change the specified SLO to match the measured SLI',
        'Move the service to higher-specification compute instances with more memory',
        'Set up additional service instances in other zones and load balance the traffic between all instances',
        'Set up additional service instances in other zones and use them as a failover in case the primary instance is unavailable',
      ],
      answer: 'Set up additional service instances in other zones and load balance the traffic between all instances'
    },
  {      
      question: '*You are running a real-time gaming application on Compute Engine that has a\
production and testing environment. Each environment has their own Virtual Private\
Cloud (VPC) network. The application frontend and backend servers are located on\
different subnets in the environment\'s VPC. You suspect there is a malicious process\
communicating intermittently in your production frontend servers. You want to ensure\
that network traffic is captured for analysis. What should you do?*' ,
      options: [
        'Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 0.5.',
        'Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 1.0.',
        'Enable VPC Flow Logs on the testing and production VPC network frontend\
and backend subnets with a volume scale of 0.5. Apply changes in testing before\
production.',
        'Enable VPC Flow Logs on the testing and production VPC network frontend\
and backend subnets with a volume scale of 1.0. Apply changes in testing before\
production.',
      ],
      answer: 'Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 1.0.'
    },
  {      
      question: '*Your team of Infrastructure DevOps Engineers is growing, and you are starting to use\
Terraform to manage infrastructure. You need a way to implement code versioning and\
to share code with other team members. What should you do?*' ,
      options: [
        'Store the Terraform code in a version-control system. Establish procedures for\
pushing new versions and merging with the master.',
        'Store the Terraform code in a network shared folder with child folders for each\
version release. Ensure that everyone works on different files.',
        'Store the Terraform code in a Cloud Storage bucket using object versioning.\
Give access to the bucket to every team member so they can download the files.',
        'Store the Terraform code in a shared Google Drive folder so it syncs\
automatically to every team member\'s computer. Organize files with a naming\
convention that identifies each new version.',
      ],
      answer: 'Store the Terraform code in a version-control system. Establish procedures for\
pushing new versions and merging with the master.'
    },

 {      
      question: 'You are using Stackdriver to monitor applications hosted on Google Cloud Platform\
(GCP). You recently deployed a new application, but its logs are not appearing on the\
Stackdriver dashboard.\
You need to troubleshoot the issue. What should you do?' ,
      options: [
        'Confirm that the Stackdriver agent has been installed in the hosting virtual machine.',
        'Confirm that your account has the proper permissions to use the Stackdriver dashboard.',
        'Confirm that port 25 has been opened in the firewall to allow messages through to Stackdriver.',
        'Confirm that the application is using the required client library and the service account key has proper permissions.',
      ],
      answer: 'Confirm that the Stackdriver agent has been installed in the hosting virtual machine.'
    },
  {      
      question: '*Your organization recently adopted a container-based workflow for application\
development. Your team develops numerous applications that are deployed\
continuously through an automated build pipeline to the production environment. A\
recent security audit alerted your team that the code pushed to production could contain\
vulnerabilities and that the existing tooling around virtual machine (VM) vulnerabilities\
no longer applies to the containerized environment. You need to ensure the security and\
patch level of all code running through the pipeline. What should you do?*' ,
      options: [
        'Set up Container Analysis to scan and report Common Vulnerabilities and Exposures.',
        'Configure the containers in the build pipeline to always update themselves before release.',
        'Reconfigure the existing operating system vulnerability software to exist inside the container.',
        'Implement static code analysis tooling against the Docker files used to create the containers.',
      ],
      answer: 'Set up Container Analysis to scan and report Common Vulnerabilities and Exposures.'
    },
  {      
      question: '*You use Cloud Build to build your application. You want to reduce the build time while\
minimizing cost and development effort. What should you do?*' ,
      options: [
        'Use Cloud Storage to cache intermediate artifacts.',
        'Run multiple Jenkins agents to parallelize the build.',
        'Use multiple smaller build steps to minimize execution time.',
        'Use larger Cloud Build virtual machines (VMs) by using the machine-type option.',
      ],
      answer: 'Use Cloud Storage to cache intermediate artifacts.'
    },
  {      
      question: '*You support a web application that is hosted on Compute Engine. The application\
provides a booking service for thousands of users. Shortly after the release of a new\
feature, your monitoring dashboard shows that all users are experiencing latency at\
login. You want to mitigate the impact of the incident on the users of your service. What\
should you do first?*' ,
      options: [
        'Roll back the recent release.',
        'Review the Stackdriver monitoring.',
        'Upsize the virtual machines running the login services.',
        'Deploy a new release to see whether it fixes the problem.',
      ],
      answer: 'Roll back the recent release.'
    },
  {      
      question: '*You are deploying an application that needs to access sensitive information. You need\
to ensure that this information is encrypted and the risk of exposure is minimal if a\
breach occurs. What should you do?*' ,
      options: [
        'Store the encryption keys in Cloud Key Management Service (KMS) and\
rotate the keys frequently',
        'Inject the secret at the time of instance creation via an encrypted configuration\
management system.',
        'Integrate the application with a Single sign-on (SSO) system and do not\
expose secrets to the application.',
        'Leverage a continuous build pipeline that produces multiple versions of the\
secret for each instance of the application.',
      ],
      answer: 'Store the encryption keys in Cloud Key Management Service (KMS) and\
rotate the keys frequently'
    },
  {      
      question: '*You encounter a large number of outages in the production systems you support. You\
receive alerts for all the outages that wake you up at night. The alerts are due to\
unhealthy systems that are automatically restarted within a minute. You want to set up a\
process that would prevent staff burnout while following Site\
Reliability Engineering practices. What should you do?*' ,
      options: [
        'Eliminate unactionable alerts.',
        'Create an incident report for each of the alerts.',
        'Distribute the alerts to engineers in different time zones.',
        'Redefine the related Service Level Objective so that the error budget is not exhausted.',
      ],
      answer: 'Eliminate unactionable alerts.'
    },
  {      
      question: '*You have migrated an e-commerce application to Google Cloud Platform (GCP). You\
want to prepare the application for the upcoming busy season. What should you do first\
to prepare for the busy season?*' ,
      options: [
        'Load teat the application to profile its performance for scaling.',
        'Enable AutoScaling on the production clusters, in case there is growth.',
        'Pre-provision double the compute power used last season, expecting growth.',
        'Create a runbook on inflating the disaster recovery (DR) environment if there is growth.',
      ],
      answer: 'Load teat the application to profile its performance for scaling.'
    },
  {      
      question: '*You support a web application that runs on App Engine and uses CloudSQL and Cloud\
Storage for data storage. After a short spike in website traffic, you notice a big increase\
in latency for all user requests, increase in CPU use, and the number of processes\
running the application. Initial troubleshooting reveals:\
✑ After the initial spike in traffic, load levels returned to normal but users still experience\
high latency.\
✑ Requests for content from the CloudSQL database and images from Cloud Storage\
show the same high latency.\
✑ No changes were made to the website around the time the latency increased.\
✑ There is no increase in the number of errors to the users.\
You expect another spike in website traffic in the coming days and want to make sure\
users don\'t experience latency. What should you do?*' ,
      options: [
        'Upgrade the GCS buckets to Multi-Regional.',
        'Enable high availability on the CloudSQL instances.',
        'Move the application from App Engine to Compute Engine.',
        'Modify the App Engine configuration to have additional idle instances.',
      ],
      answer: 'Modify the App Engine configuration to have additional idle instances.'
    },
  {      
      question: '*Your application runs on Google Cloud Platform (GCP). You need to implement Jenkins\
for deploying application releases to GCP. You want to streamline the release process,\
lower operational toil, and keep user data secure. What should you do?*' ,
      options: [
        'Implement Jenkins on local workstations.',
        'Implement Jenkins on Kubernetes on-premises.',
        'Implement Jenkins on Google Cloud Functions.',
        'Implement Jenkins on Compute Engine virtual machines',
      ],
      answer: 'Implement Jenkins on Compute Engine virtual machines'
    },
  {      
      question: '*You are working with a government agency that requires you to archive application logs\
for seven years. You need to configure Stackdriver to export and store the logs while\
minimizing costs of storage. What should you do?*' ,
      options: [
        'Create a Cloud Storage bucket and develop your application to send logs directly to the bucket.',
        'Develop an App Engine application that pulls the logs from Stackdriver and saves them in BigQuery.',
        'Create an export in Stackdriver and configure Cloud Pub/Sub to store logs in permanent storage for seven years.',
        'Create a sink in Stackdriver, name it, create a bucket on Cloud Storage for storing archived logs, and then select the bucket as the log export destination.',
      ],
      answer: 'Create a sink in Stackdriver, name it, create a bucket on Cloud Storage for storing archived logs, and then select the bucket as the log export destination.'
    },
  {      
      question: 'You support a trading application written in Python and hosted on App Engine flexible\
environment. You want to customize the error information being sent to\
Stackdriver Error Reporting. What should you do?' ,
      options: [
        'Install the Stackdriver Error Reporting library for Python, and then run your code on a Compute Engine VM.',
        'Install the Stackdriver Error Reporting library for Python, and then run your code on Google Kubernetes Engine.',
        'Install the Stackdriver Error Reporting library for Python, and then run your code on App Engine flexible environment.',
        'Use the Stackdriver Error Reporting API to write errors from your application \
to ReportedErrorEvent, and then generate log entries with properly formatted\
error messages in Stackdriver Logging.',
      ],
      answer: 'Use the Stackdriver Error Reporting API to write errors from your application \
to ReportedErrorEvent, and then generate log entries with properly formatted\
error messages in Stackdriver Logging.'
    },
  {      
      question: '*You need to define Service Level Objectives (SLOs) for a high-traffic multi-region web\
application. Customers expect the application to always be available and have fast\
response times. Customers are currently happy with the application performance and\
availability. Based on current measurement, you observe that the\
90\
percentile of latency is 120ms and the 95\
percentile of latency is 275ms over a 28-day window. What latency SLO would you\
recommend to the team to th th publish?*' ,
      options: [
        '90 percentile 100 "€גms th 95 percentile 250 "€גms th',
        '90 percentile 120 "€גms th 95 percentile 275 "€גms th',
        '90 percentile 150 "€גms th 95 percentile 300 "€גms th',
        '90 percentile 250 "€גms th 95 percentile 400 "€גms th',
      ],
      answer: '90 percentile 150 "€גms th 95 percentile 300 "€גms th'
    },
  {      
      question: '*You support a large service with a well-defined Service Level Objective (SLO). The\
development team deploys new releases of the service multiple times a week.\
If a major incident causes the service to miss its SLO, you want the development team\
to shift its focus from working on features to improving service reliability.\
What should you do before a major incident occurs?*' ,
      options: [
        'Develop an appropriate error budget policy in cooperation with all service stakeholders.',
        'Negotiate with the product team to always prioritize service reliability over releasing new features.',
        'Negotiate with the development team to reduce the release frequency to no more than once a week.',
        'Add a plugin to your Jenkins pipeline that prevents new releases whenever  your service is out of SLO.',
      ],
      answer: 'Develop an appropriate error budget policy in cooperation with all service stakeholders.'
    },
  {      
      question: '*Your company is developing applications that are deployed on Google Kubernetes\
Engine (GKE). Each team manages a different application. You need to create the\
development and production environments for each team, while minimizing costs.\
Different teams should not be able to access other teams\' environments.\
What should you do?*' ,
      options: [
        'Create one GCP Project per team. In each project, create a cluster for\
Development and one for Production. Grant the teams IAM access to their\
respective clusters.',
        'Create one GCP Project per team. In each project, create a cluster with a\
Kubernetes namespace for Development and one for Production. Grant the\
teams IAM access to their respective clusters.',
        'Create a Development and a Production GKE cluster in separate projects. In\
each cluster, create a Kubernetes namespace per team, and then configure\
Identity Aware Proxy so that each team can only access its own namespace.',
        'Create a Development and a Production GKE cluster in separate projects. In\
each cluster, create a Kubernetes namespace per team, and then configure\
Kubernetes Role-based access control (RBAC) so that each team can only\
access its own namespace.',
      ],
      answer: 'Create a Development and a Production GKE cluster in separate projects. In\
each cluster, create a Kubernetes namespace per team, and then configure\
Kubernetes Role-based access control (RBAC) so that each team can only\
access its own namespace.'
    },
  {      
      question: '*Some of your production services are running in Google Kubernetes Engine (GKE) in\
the eu-west-1 region. Your build system runs in the us-west-1 region. You want to push\
the container images from your build system to a scalable registry to maximize the\
bandwidth for transferring the images to the cluster. What should you do?*' ,
      options: [
        'Push the images to Google Container Registry (GCR) using the gcr.io hostname.',
        'Push the images to Google Container Registry (GCR) using the us.gcr.io hostname.',
        'Push the images to Google Container Registry (GCR) using the eu.gcr.io hostname.',
        'Push the images to a private image registry running on a Compute Engine instance in the eu-west-1 region.',
      ],
      answer: 'Push the images to Google Container Registry (GCR) using the eu.gcr.io hostname.'
    },
    {      
      question: '*You manage several production systems that run on Compute Engine in the same\
Google Cloud Platform (GCP) project. Each system has its own set of dedicated\
Compute Engine instances. You want to know how must it costs to run each of the\
systems. What should you do?*' ,
      options: [
        'In the Google Cloud Platform Console, use the Cost Breakdown section to visualize the costs per system.',
        'Assign all instances a label specific to the system they run. Configure BigQuery billing export and query costs per label.',
        'Enrich all instances with metadata specific to the system they run. Configure\
Stackdriver Logging to export to BigQuery, and query costs based on the\
metadata.',
        'Name each virtual machine (VM) after the system it runs. Set up a usage\
report export to a Cloud Storage bucket. Configure the bucket as a source in\
BigQuery to query costs based on VM name.',
      ],
      answer: 'Assign all instances a label specific to the system they run. Configure BigQuery billing export and query costs per label.'
    },
    {      
      question: '*You use Cloud Build to build and deploy your application. You want to securely\
incorporate database credentials and other application secrets into the build pipeline.\
You also want to minimize the development effort. What should you do?*' ,
      options: [
        'Create a Cloud Storage bucket and use the built-in encryption at rest. Store\
the secrets in the bucket and grant Cloud Build access to the bucket.',
        'Encrypt the secrets and store them in the application repository. Store a\
decryption key in a separate repository and grant Cloud Build access to the\
repository.',
        'Use client-side encryption to encrypt the secrets and store them in a Cloud\
Storage bucket. Store a decryption key in the bucket and grant Cloud Build\
access to the bucket.',
        'Use Cloud Key Management Service (Cloud KMS) to encrypt the secrets and\
include them in your Cloud Build deployment configuration. Grant Cloud Build\
access to the KeyRing.',
      ],
      answer: 'Use Cloud Key Management Service (Cloud KMS) to encrypt the secrets and\
include them in your Cloud Build deployment configuration. Grant Cloud Build\
access to the KeyRing.'
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
