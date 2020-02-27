{
  "previous": null,
  "results": [
      {
          "versions": [
              {
                  "lab_params": [
                      {
                          "help": "name of vm",
                          "required": true,
                          "value": null,
                          "name": "vmname"
                      }
                  ],
                  "detail_description": "Catalog: acs-engine-autoscaler\r\nacs-engine-autoscaler\r\nAcs-Engine-Autoscaler\r\nDEPRECATED Scales worker nodes within agent pools\r\nDEPRECATED: acs-engine-autoscaler\r\nacs-engine-autoscaler is a node-level autoscaler for Kubernetes for clusters created with acs-engine.\r\nTL;DR:\r\n$ helm install stable/acs-engine-autoscaler -f values.yaml\r\nWhere values.yaml contains:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nIntroduction\r\nThis chart bootstraps an acs-engine-autoscaler deployment on a Kubernetes cluster using the Helm package manager.\r\nPrerequisites\r\nKubernetes 1.6+\r\nInstalling the Chart\r\nIn order for the chart to configure the acs-engine-autoscaler properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes all the values in the values.yaml file:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nTo install the chart with the release name my-release:\r\n$ helm install --name my-release stable/acs-engine-autoscaler\r\nThe command deploys acs-engine-autoscaler on the Kubernetes cluster using the supplied configuration. The configuration section lists the parameters that can be configured during installation.\r\nTip: List all releases using helm list\r\nVerifying Installation\r\nTo verify the acs-engine-autoscaler is configured properly find the pod that the deployment created and look at its logs. The result will look something similar to the following:\r\nTo verify that acs-engine-autoscaler has started, run:\r\n kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nTo verify that acs-engine-autoscaler is running as expected, run:\r\n kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n$ kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nNAME                                                     READY     STATUS    RESTARTS   AGE\r\nolfactory-bunny-acs-engine-autoscaler-1715934483-c673v   1/1       Running   0          10s\r\n$ kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - DEBUG - Using kube service account\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - INFO - ++++ Running Scaling Loop ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pods to schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - ++++ Scaling Up Begins ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Nodes: 1\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - To schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pending pods: 0\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Scaling Up Ends ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Maintenance Begins ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.engine_scaler - INFO - ++++ Maintaining Nodes ++++++\r\n2017-06-11 23:20:59,423 - autoscaler.engine_scaler - INFO - node: k8s-agentpool1-29744472-4                                                   state: under-utilized-undrainable\r\n2017-06-11 23:20:59,423 - autoscaler.cluster - INFO - ++++ Maintenance Ends ++++++\r\n...\r\nUninstalling the Chart\r\nTo uninstall/delete the last deployment:",
                  "description": {
                      "name": [
                          "lab1test, catalog acs-engine-autoscaler"
                      ]
                  },
                  "lab_stat": {
                      "CPU": 2,
                      "vm": 3,
                      "memory": "200MB",
                      "disk": "200TB"
                  },
                  "version": "v1",
                  "id": "53ae62e5-d412-403c-bb0b-4b9c79e1950f"
              }
          ],
          "name": "lab1",
          "latest_version": {
              "lab_params": [
                  {
                      "help": "name of vm",
                      "required": true,
                      "value": null,
                      "name": "vmname"
                  }
              ],
              "detail_description": "Catalog: acs-engine-autoscaler\r\nacs-engine-autoscaler\r\nAcs-Engine-Autoscaler\r\nDEPRECATED Scales worker nodes within agent pools\r\nDEPRECATED: acs-engine-autoscaler\r\nacs-engine-autoscaler is a node-level autoscaler for Kubernetes for clusters created with acs-engine.\r\nTL;DR:\r\n$ helm install stable/acs-engine-autoscaler -f values.yaml\r\nWhere values.yaml contains:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nIntroduction\r\nThis chart bootstraps an acs-engine-autoscaler deployment on a Kubernetes cluster using the Helm package manager.\r\nPrerequisites\r\nKubernetes 1.6+\r\nInstalling the Chart\r\nIn order for the chart to configure the acs-engine-autoscaler properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes all the values in the values.yaml file:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nTo install the chart with the release name my-release:\r\n$ helm install --name my-release stable/acs-engine-autoscaler\r\nThe command deploys acs-engine-autoscaler on the Kubernetes cluster using the supplied configuration. The configuration section lists the parameters that can be configured during installation.\r\nTip: List all releases using helm list\r\nVerifying Installation\r\nTo verify the acs-engine-autoscaler is configured properly find the pod that the deployment created and look at its logs. The result will look something similar to the following:\r\nTo verify that acs-engine-autoscaler has started, run:\r\n kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nTo verify that acs-engine-autoscaler is running as expected, run:\r\n kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n$ kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nNAME                                                     READY     STATUS    RESTARTS   AGE\r\nolfactory-bunny-acs-engine-autoscaler-1715934483-c673v   1/1       Running   0          10s\r\n$ kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - DEBUG - Using kube service account\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - INFO - ++++ Running Scaling Loop ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pods to schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - ++++ Scaling Up Begins ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Nodes: 1\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - To schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pending pods: 0\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Scaling Up Ends ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Maintenance Begins ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.engine_scaler - INFO - ++++ Maintaining Nodes ++++++\r\n2017-06-11 23:20:59,423 - autoscaler.engine_scaler - INFO - node: k8s-agentpool1-29744472-4                                                   state: under-utilized-undrainable\r\n2017-06-11 23:20:59,423 - autoscaler.cluster - INFO - ++++ Maintenance Ends ++++++\r\n...\r\nUninstalling the Chart\r\nTo uninstall/delete the last deployment:",
              "description": {
                  "name": [
                      "lab1test, catalog acs-engine-autoscaler"
                  ]
              },
              "lab_stat": {
                  "CPU": 2,
                  "vm": 3,
                  "memory": "200MB",
                  "disk": "200TB"
              },
              "version": "v1",
              "id": "53ae62e5-d412-403c-bb0b-4b9c79e1950f"
          }
      },
      {
          "versions": [
              {
                  "lab_params": [
                      {
                          "help": "name of coredisk",
                          "required": true,
                          "value": null,
                          "name": "coredisk"
                      }
                  ],
                  "detail_description": "Catalog: acs-engine-autoscaler\r\nacs-engine-autoscaler\r\nAcs-Engine-Autoscaler\r\nDEPRECATED Scales worker nodes within agent pools\r\nDEPRECATED: acs-engine-autoscaler\r\nacs-engine-autoscaler is a node-level autoscaler for Kubernetes for clusters created with acs-engine.\r\nTL;DR:\r\n$ helm install stable/acs-engine-autoscaler -f values.yaml\r\nWhere values.yaml contains:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nIntroduction\r\nThis chart bootstraps an acs-engine-autoscaler deployment on a Kubernetes cluster using the Helm package manager.\r\nPrerequisites\r\nKubernetes 1.6+\r\nInstalling the Chart\r\nIn order for the chart to configure the acs-engine-autoscaler properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes all the values in the values.yaml file:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nTo install the chart with the release name my-release:\r\n$ helm install --name my-release stable/acs-engine-autoscaler\r\nThe command deploys acs-engine-autoscaler on the Kubernetes cluster using the supplied configuration. The configuration section lists the parameters that can be configured during installation.\r\nTip: List all releases using helm list\r\nVerifying Installation\r\nTo verify the acs-engine-autoscaler is configured properly find the pod that the deployment created and look at its logs. The result will look something similar to the following:\r\nTo verify that acs-engine-autoscaler has started, run:\r\n kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nTo verify that acs-engine-autoscaler is running as expected, run:\r\n kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n$ kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nNAME                                                     READY     STATUS    RESTARTS   AGE\r\nolfactory-bunny-acs-engine-autoscaler-1715934483-c673v   1/1       Running   0          10s\r\n$ kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - DEBUG - Using kube service account\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - INFO - ++++ Running Scaling Loop ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pods to schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - ++++ Scaling Up Begins ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Nodes: 1\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - To schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pending pods: 0\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Scaling Up Ends ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Maintenance Begins ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.engine_scaler - INFO - ++++ Maintaining Nodes ++++++\r\n2017-06-11 23:20:59,423 - autoscaler.engine_scaler - INFO - node: k8s-agentpool1-29744472-4                                                   state: under-utilized-undrainable\r\n2017-06-11 23:20:59,423 - autoscaler.cluster - INFO - ++++ Maintenance Ends ++++++\r\n...\r\nUninstalling the Chart\r\nTo uninstall/delete the last deployment:",
                  "description": {
                      "name": "lab2test, catalog acs-engine-autoscaler, acs-engine-autoscaler\nAcs-Engine-Autoscaler"
                  },
                  "lab_stat": {
                      "CPU": 2,
                      "vm": 2,
                      "memory": "200MB",
                      "disk": "200TB"
                  },
                  "version": "v1",
                  "id": "5f72499a-93c6-41be-bdab-a828fa613b54"
              }
          ],
          "name": "lab2",
          "latest_version": {
              "lab_params": [
                  {
                      "help": "name of coredisk",
                      "required": true,
                      "value": null,
                      "name": "coredisk"
                  }
              ],
              "detail_description": "Catalog: acs-engine-autoscaler\r\nacs-engine-autoscaler\r\nAcs-Engine-Autoscaler\r\nDEPRECATED Scales worker nodes within agent pools\r\nDEPRECATED: acs-engine-autoscaler\r\nacs-engine-autoscaler is a node-level autoscaler for Kubernetes for clusters created with acs-engine.\r\nTL;DR:\r\n$ helm install stable/acs-engine-autoscaler -f values.yaml\r\nWhere values.yaml contains:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nIntroduction\r\nThis chart bootstraps an acs-engine-autoscaler deployment on a Kubernetes cluster using the Helm package manager.\r\nPrerequisites\r\nKubernetes 1.6+\r\nInstalling the Chart\r\nIn order for the chart to configure the acs-engine-autoscaler properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes all the values in the values.yaml file:\r\nacsenginecluster:\r\n resourcegroup:\r\n azurespappid:\r\n azurespsecret:\r\n azuresptenantid:\r\n kubeconfigprivatekey:\r\n clientprivatekey:\r\n caprivatekey:\r\nTo install the chart with the release name my-release:\r\n$ helm install --name my-release stable/acs-engine-autoscaler\r\nThe command deploys acs-engine-autoscaler on the Kubernetes cluster using the supplied configuration. The configuration section lists the parameters that can be configured during installation.\r\nTip: List all releases using helm list\r\nVerifying Installation\r\nTo verify the acs-engine-autoscaler is configured properly find the pod that the deployment created and look at its logs. The result will look something similar to the following:\r\nTo verify that acs-engine-autoscaler has started, run:\r\n kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nTo verify that acs-engine-autoscaler is running as expected, run:\r\n kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n$ kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\"\r\nNAME                                                     READY     STATUS    RESTARTS   AGE\r\nolfactory-bunny-acs-engine-autoscaler-1715934483-c673v   1/1       Running   0          10s\r\n$ kubectl logs $(kubectl --namespace=default get pods -l \"app=olfactory-bunny-acs-engine-autoscaler\" -o jsonpath=\"{.items[0].metadata.name}\")\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - DEBUG - Using kube service account\r\n2017-06-11 23:20:59,352 - autoscaler.cluster - INFO - ++++ Running Scaling Loop ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pods to schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - ++++ Scaling Up Begins ++++++\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Nodes: 1\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - To schedule: 0\r\n2017-06-11 23:20:59,421 - autoscaler.cluster - INFO - Pending pods: 0\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Scaling Up Ends ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.cluster - INFO - ++++ Maintenance Begins ++++++\r\n2017-06-11 23:20:59,422 - autoscaler.engine_scaler - INFO - ++++ Maintaining Nodes ++++++\r\n2017-06-11 23:20:59,423 - autoscaler.engine_scaler - INFO - node: k8s-agentpool1-29744472-4                                                   state: under-utilized-undrainable\r\n2017-06-11 23:20:59,423 - autoscaler.cluster - INFO - ++++ Maintenance Ends ++++++\r\n...\r\nUninstalling the Chart\r\nTo uninstall/delete the last deployment:",
              "description": {
                  "name": "lab2test, catalog acs-engine-autoscaler, acs-engine-autoscaler\nAcs-Engine-Autoscaler"
              },
              "lab_stat": {
                  "CPU": 2,
                  "vm": 2,
                  "memory": "200MB",
                  "disk": "200TB"
              },
              "version": "v1",
              "id": "5f72499a-93c6-41be-bdab-a828fa613b54"
          }
      }
  ],
  "count": 2,
  "next": null
}