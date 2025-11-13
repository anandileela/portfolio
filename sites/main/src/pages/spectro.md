---
layout: ../layouts/MarkdownLayout.astro
title: Spectro Cloud Technical Writer Assignment
---

# Debug operations in Kubernetes

This guide describes common errors, debug commands, and a basic debugging workflow for Kubernetes components using the `kubectl` command line tool.

## How it works

The Kubernetes architecture components make it easy to locate operational issues and debug your applications. You can troubleshoot issues precisely by running debugging commands that work for a specific component. For more information about Kubernetes and the Kubernetes components, see [Kubernetes.io: Overview](https://kubernetes.io/docs/concepts/overview/) and [Kubernetes.io: Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/).

The following table lists the Kubernetes components and common errors that can occur for each:

| Kubernetes Component| Description| Common Errors |
|---|---|---|
| Pods | The smallest deployable unit in Kubernetes, containing one or more containers. | Failed liveness probes, insufficient permissions, non-starting pods, pod crashes, resource limitations, configuration errors. |
| Nodes | The physical or virtual worker machines where pods are deployed. | Insufficient resources, kubelet failures, network connectivity, node health.  |
| Cluster | A collection of nodes managed by Kubernetes. | VM(s) shutdown, network partition issues, crashes in Kubernetes software, data loss or unavailability of persistent storage, misconfigured Kubernetes software or application software. |
| Service | A method for exposing applications running on pods and managing internal networking. | Network policies misconfiguration, DNS namespace issues, incorrect service definitions, pods not identified in EndpointSlice, service proxy misconfigurations. |

The following sections describe common debugging commands for each Kubernetes component. For more information and a full list of debug operations and recommendations, see [Kubernetes.io: Monitoring, Logging, and Debugging](https://kubernetes.io/docs/tasks/debug/).

## Requirements

Before debugging, you should be familiar with the following tools:

* **`kubectl`**
The CLI used to manage Kubernetes components and communicate with the Kubernetes API server. For more information about `kubectl` and a reference guide, see [Kubernetes.io: Getting Started](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands).

You may want to consider using the Kubernetes Dashboard for additional debugging support. The Kubernetes Dashboard is a web-based UI for monitoring and managing Kubernetes clusters. For more information about troubleshooting using a UI, see [Kubernetes.io: Deploy and Access the Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

## Basic debugging commands

Use `kubectl` commands as your first step in troubleshooting Kubernetes application problems. Using `kubectl`, you can easily identify non-starting pods, diagnosing pod crashes, identifying resource limitations, or uncovering configuration errors that could be affecting your deployments.

The basic commands below automatically search your default namespace for the corresponding component. To use a specific, non-default namespace, add `--namespace <namespace>` to your command and specify the namespace you want to use. For example,

```shell
kubectl get pods --namespace <namespace>
```

### Containers

#### Exec

Debug a container within the container or explore the the environment of the container in real time to inspect the container state, manual configuration verification, or real-time execution of diagnostic utilities:

```shell
kubectl exec 
```

**Note**: Modifying a container filesystem or configuration files directly can lead to unpredictable behavior or discrepancies between the running application state and its defined deployment configurations. 


#### Debug 

Create a clone of a pod that does not terminate if an error is experienced inside the container: 

```shell
kubectl debug
```

### Pod commands

Basic commands to begin troubleshooting pods. For more information, see [Kubernetes.io: Debug Pods]](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/).

#### List pods

List all pods in every namespace in the cluster and identify any that are not running:

```shell
kubectl get pods --all-namespaces
```

#### Describe pods

Retrieve detailed information about a specific pod, like events, resource requests, and limits in the default namespace:

```shell
kubectl describe pod <pod-name>
```

#### Pod logs

Retrieve logs associated with a specific pod in your default namespace:

```shell
kubectl logs <pod-name>
```

### Node commands

Basic commands to begin troubleshooting nodes. For more information, see [Kubernetes.io: Debugging Kubernetes with Kubectl](https://kubernetes.io/docs/tasks/debug/debug-cluster/kubectl-node-debug/).

#### List nodes

Check the health status of worker nodes:

```shell
kubectl get nodes
```

### Cluster commands

Basic commands to begin debugging a cluster. For more information, see [Kubernetes.io: Troubleshooting Clusters](https://kubernetes.io/docs/tasks/debug/debug-cluster/).

#### Cluster information

Get detailed information about the overall health of your cluster:

```shell
kubectl cluster-info
```

#### Component status

Check the health status of the Kubernetes cluster components, such as the control plane components, including the etcd, kube-apiserver, kube-controller-manager, and kube-scheduler (depending on the components installed for your cluster):

```shell
kubectl get componentstatus
```

#### View events

Events can be used to track changes and actions that occur in the cluster, including the creation, modification, and deletion of resources and lets you see issues with pod scheduling, container starts, and health check failures. 

View the events in the cluster:

```shell
kubectl get events
```

See events across namespaces sorted by timestamp:

```shell
kubectl get events --all-namespaces --sort-by='.metadata.creationTimestamp'
```

This command organizes events in chronological order, which lets you trace the sequence of actions and identify where issues started.

**Tip**: Kubernetes events are ephemeral, meaning they are stored only for a short period of time within the cluster. You may not always have access to older events, which makes diagnosing issues more difficult. To make debugging easier, consider integrating your cluster with a centralized logging solution to retain events for longer periods of time. A logging system for events allows you to see historical data and monitor event trends.

### Service commands

Basic commands to begin debugging services. For more information, see [Kubernetes.io: Debug Service](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/).


#### List services

Verify that a service exists:

```shell
kubectl get svc hostnames
```

#### Describe service

Verify service configurations:

```shell
kubectl describe service <service-name>
```

#### Check endpoints

Check service endpoints:

```shell
kubectl get endpoints <service-name>
```

## Debugging strategies

A common debugging workflow includes: checking logs, examining events, and reviewing the current statuses of pods, deployments, nodes, clusters, and services. You may want to approach your debugging strategy starting with logs and events to identify the issues, from direct issue and expand to the system-level debugging, or with cluster investigations. 

For example, the following basic workflow lets you first identify the issues and where to beging troubleshooting:

```shell
kubectl get pods

kubectl logs

kubectl exec 
```

**Note**: When debugging Kubernetes issues, troubleshoot the specific component and also the broader cluster context. For example, there could be problems with network policies, service misconfigurations, or persistent volume claims. Consider debugging at each level instead of relying on pod- or node-level debugging only.
