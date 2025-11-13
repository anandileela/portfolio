---
layout: ../layouts/MarkdownLayout.astro
title: Spectro Cloud Technical Writer Assignment
---

# Debug operations in Kubernetes

This guide describes common errors, debug commands, and a basic debugging strategy for Kubernetes components using the `kubectl` command line tool.

## How it works

To effectively debug Kubernetes issues, you will need to start by gathering information about each component level: logs, examining events, and reviewing the current statuses of pods, nodes, clusters, services, and deployments. Though the Kubernetes architecture can be complex, you can troubleshoot issues precisely by running debugging commands that work for a specific component. For more information about Kubernetes and Kubernetes components, refer to [Kubernetes.io: Overview](https://kubernetes.io/docs/concepts/overview/) and [Kubernetes.io: Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/).

The following table lists the Kubernetes components and common errors that can occur at each component level:

| Kubernetes Component| Description| Common Errors |
|---|---|---|
| Pods | The smallest deployable unit in Kubernetes, containing one or more containers. | Failed liveness probes, insufficient permissions, non-starting pods, pod crashes, resource limitations, configuration errors. |
| Nodes | The physical or virtual worker machines where pods are deployed. | Insufficient resources, kubelet failures, network connectivity, node health.  |
| Cluster | A collection of nodes managed by Kubernetes. | VM(s) shutdown, network partition issues, crashes in Kubernetes software, data loss or unavailability of persistent storage, misconfigured Kubernetes software or application software. |
| Service | A method for exposing applications running on pods and managing internal networking. | Network policies misconfiguration, DNS namespace issues, incorrect service definitions, pods not identified in EndpointSlice, service proxy misconfigurations. |

The following sections describe common debugging commands for each Kubernetes component. For more information and a full list of debug operations and recommendations, refer to [Kubernetes.io: Monitoring, Logging, and Debugging](https://kubernetes.io/docs/tasks/debug/).

## Requirements

Before debugging, you should be familiar with the following tool:

* **`kubectl`**
The CLI used to manage Kubernetes components and communicate with the Kubernetes API server. For more information about `kubectl` and a reference guide, refer to [Kubernetes.io: Getting Started](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands).

You may also want to use the Kubernetes Dashboard (web-based UI) for additional visual debugging and monitoring. For more information about troubleshooting using a UI, refer to [Kubernetes.io: Deploy and Access the Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

## Basic debugging commands

Use `kubectl` as your first step in troubleshooting Kubernetes issues. Using `kubectl`, you can identify non-starting pods, diagnose pod crashes, and uncover configuration errors that could be affecting your deployments.

**Note**: The basic commands below automatically search your default namespace for the corresponding component. To use a specific, non-default namespace, add `--namespace <namespace>` to your command and specify the namespace you want to use. For example,

```shell
kubectl get pods --namespace <namespace>
```

### Containers

Basic commands to directly inspect running containers. For more information about `exec` and `debug` `kubectl` commands, refer to [Debug Running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/).

#### Exec

Debug a container within the container or explore the the environment of the container in real time to inspect the container state, manual configuration verification, or real-time execution of diagnostic utilities. To open an interactive shell within a specific container in a pod:

```shell
kubectl exec -it <pod-name> --container <container-name> -- /bin/sh
```

**Note**: Modifying a container filesystem or configuration files directly can lead to unpredictable behavior or discrepancies between the running application state and its defined deployment configurations. 

#### Debug 

Debug a live pod using temporary (ephemeral) interactive debugging containers without restarting it:

```shell
kubectl debug <pod-name> -it --image=busybox --target=<container-name>
```

**Note**: This command automatically generates a container name if you don't choose one using the `--container` flag.

Create a copy of a pod for debugging:

```shell
kubectl debug <original-pod-name> --copy-to=<new-debug-pod-name>
```

You can also use the `debug` command to deploy a Pod to a Node that you want to troubleshoot. For more information, refer to [Kubernetes.io: Debugging a Node using kubectl debug node](https://kubernetes.io/docs/tasks/debug/debug-cluster/kubectl-node-debug/#debugging-a-node-using-kubectl-debug-node).

### Pod commands

Basic commands to check application health and begin debugging pods. For more information, refer to [Kubernetes.io: Debug Pods]](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/).

#### List pods

List all pods in every namespace in the cluster and identify any that are not running:

```shell
kubectl get pods --all-namespaces
```

#### Describe pods

Retrieve detailed information about a specific pod, such as events, resource requests, and limits in the default namespace:

```shell
kubectl describe pod <pod-name>
```

#### Pod logs

Retrieve logs associated with a specific pod in your default namespace:

```shell
kubectl logs <pod-name>
```

### Node commands

Basic commands to begin troubleshooting nodes. For more information, refer to [Kubernetes.io: Debugging Kubernetes with Kubectl](https://kubernetes.io/docs/tasks/debug/debug-cluster/kubectl-node-debug/).

#### List nodes

Check the health status of worker nodes:

```shell
kubectl get nodes
```

#### Describe nodes

Retrieve detailed information about nodes, including events, conditions, taints, and resource usage:

```shell
kubectl describe node <node-name>
```

### Cluster commands

Basic commands to begin debugging a cluster or determine the cause of Control Panel failures. For more information, refer to [Kubernetes.io: Troubleshooting Clusters](https://kubernetes.io/docs/tasks/debug/debug-cluster/).

#### Cluster information

Get detailed information about the overall health of your cluster:

```shell
kubectl cluster-info
```

#### Component status

Check the health status of the Kubernetes cluster components, such as the control plane components, including the etcd, kube-apiserver, kube-controller-manager, and kube-scheduler:

```shell
kubectl get componentstatus
```

#### View events

Events can be used to track changes and actions that occur in the cluster, including the creation, modification, and deletion of resources. Viewing events lets you identify issues with pod scheduling, container starts, and health check failures. 

View the events in the cluster:

```shell
kubectl get events
```

List events across namespaces sorted by timestamp:

```shell
kubectl get events --all-namespaces --sort-by='.metadata.creationTimestamp'
```

This command organizes events in chronological order, which lets you trace the sequence of actions and identify where issues started.

**Tip**: Kubernetes events are ephemeral, meaning they are stored only for a short period of time within the cluster. Consider integrating your cluster with a centralized logging solution to retain events for longer periods of time. A logging system for events allows you to view historical data and monitor event trends.

### Service commands

Basic commands to determine the cause of service issues, such as network and connectivity problems. For more information, refer to [Kubernetes.io: Debug Service](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/).

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

For example, the following basic top-down workflow lets you first identify the issues and where to begin troubleshooting:

```shell
kubectl get pods

kubectl logs <failing-pod>

kubectl describe pod <failing-pod>

kubectl exec 
```

**Note**: When debugging Kubernetes issues, troubleshoot the specific component and also the broader cluster context. For example, there could be problems with network policies, service misconfigurations, or persistent volume claims. Consider debugging at each level instead of relying on pod- or node-level debugging only.
