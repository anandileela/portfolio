---
layout: ../layouts/MarkdownLayout.astro
title: Review - Technical Writer Assignment
---

This document provides a review of my process in creating the assignment documents.

1.) I reviewed the Veeva Vault high-level design document and additional required Veeva Vault docs.

2.) I stepped through the process in the command line, beginning with authentication. I did note that improvements could be made in how versioning is introduced and what endpoint/version examples are used to improve time to first task [Veeva: Authentication](https://developer.veevavault.com/docs/#authentication).

3.) After successfully authenticating and noting the session ID, I then turned to the design doc to try to upload files. Here I spent a good deal of time trying to find the correct documentation to aid in file upload. I initially used [Veeva: Upload a document](https://developer.veevavault.com/docs/#upload-a-document), but this was not the appropriate file. I then used Claude to aid in my search for the correct CURL command format. 

4.) I successfully uploaded both files to Veeva Vault and verified them.

5.) To use the Onboarding API, I spent extra time searching for what the employee ID was and how to find it. Once located, I had trouble executing a successful request because the design specification used camel case for the parameters, while the request actually took snake case. After troubleshooting, I successfully onboarded an employee.

Overall, this assignment took half a day (if added all together). Notable pain points were in versioning (minor), how to upload a file (significant), and in using the correct employee ID (minor).
