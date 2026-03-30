---
layout: ../layouts/MarkdownLayout.astro
title: User Guide - Technical Writer Assignment
---

# Employee Onboarding

This guide describes how to upload employee records to Veeva Vault and use the Employee Onboarding API to mark them as onboarded.

Requirements:

**API Version:** Vault API v26.1+  
**Permission required:** HR WebAPI Group

---

> **Before you begin:** You must be added to the **HR WebAPI Group** in Vault to call any HR APIs. Requests from users outside this group return a `MALFORMED_URL` error. Contact your Vault admin to request access before proceeding.

---

## Step 1: Authenticate and get a session ID

All API calls require a valid Vault session ID passed in the `Authorization` header. Authenticate using your Vault credentials. For more information, see [Veeva: Authentication](https://developer.veevavault.com/docs/#authentication) and [Veeva: Structuring the Endpoint](https://developer.veevavault.com/docs/#structuring-the-endpoint).

### Request example

```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=YOUR_USERNAME&password=YOUR_PASSWORD" \
  "https://{{vaultDNS}}/api/v26.1/auth"
```

### Response example

 Copy the `sessionId` value for later use.

```json
{
  "responseStatus": "SUCCESS",
  "sessionId": "62DBF052CCB5E937BAB81F097D...",
  "userId": 12021
}
```

> **Tip:** Sessions expire after inactivity (duration set by your Vault admin, max 48 hours). Reuse your session ID across requests rather than re-authenticating each time.

---

## Step 2: Prepare your employee CSV file

Create a CSV file with one row per employee. The header row must use Vault API field names. At minimum, include `name__v` and any required fields for your Vault's `employee__c` object configuration.

```csv
name__v,employee_id__c,department__c,status__v
Jane Smith,EMP001,Engineering,active__v
John Doe,EMP002,Marketing,active__v
```

> **Tip:** To confirm required fields for your Vault, call `GET /api/v26.1/metadata/vobjects/employee__c` and check which fields have `"required": true`. Picklist values must use the API name (for example, `active__v`, not `Active`).

---

## Step 3: Upload employee records in bulk

Use the batch object records endpoint to upload your CSV. For more information, see [Veeva: Document Creation Overview](https://developer.veevavault.com/docs/#document-creation-overview).

Limit: Max 500 records per request. Split larger files into multiple batches.

### Request example

```bash
curl -X POST \
  -H "Authorization: YOUR_SESSION_ID" \
  -H "Content-Type: text/csv" \
  -H "Accept: text/csv" \
  --data-binary @"/path/to/employees.csv" \
  "https://{{vaultDNS}}/api/v26.1/vobjects/employee__c/batch"
```

### Response

```
responseStatus,id,errors,row_id
SUCCESS,V7S000000002005,,1
SUCCESS,V7S000000002006,,2
```

> **Important:** Save the `employee_id` values returned in the response to use with the Employee Onboarding API.

If you need to look up an employee's Vault record ID after upload, open the employee record in the Vault UI. The record ID appears in the URL as the segment starting with your object prefix (for example, `V7S`).

### Example URL

```
https://devexp-hr-demo-anandi.veevavault.com/ui/#t/0TB00000000T008/V7S/V7S000000002005?expanded=details__c...
```

The record ID from this URL is: `V7S000000002005`

> **Tip:** You can also retrieve all employee record IDs via API: `GET /api/v26.1/vobjects/employee__c`


## Step 4: Upload employee address records in bulk (optional)

If you have address data to associate with your employees, upload it as a separate CSV to the `address__c` object.

> **Note:** Each address record must reference the Vault record ID of the employee it belongs to (returned in the Step 3 response), not the internal employee ID.

### Example address CSV

```csv
name__v,employee__c,street__c,city__c,state__c,postal_code__c,country__c
Jane Smith Home,V7S000000002005,123 Main St,San Francisco,CA,94105,US
John Doe Home,V7S000000002006,456 Oak Ave,New York,NY,10001,US
```

> **Tip:** To confirm required fields and exact API names for your Vault's address object, call `GET /api/v26.1/metadata/vobjects/address__c`.

### Request example

```bash
curl -X POST \
  -H "Authorization: YOUR_SESSION_ID" \
  -H "Content-Type: text/csv" \
  -H "Accept: text/csv" \
  --data-binary @"/path/to/addresses.csv" \
  "https://{{vaultDNS}}/api/v26.1/vobjects/address__c/batch"
```

### Response example

```
responseStatus,id,errors,row_id
SUCCESS,ADR000000001001,,1
SUCCESS,ADR000000001002,,2
```

---

## Step 5: Call the Employee Onboarding API

With the employee's Vault record ID and your chosen onboarding date, call the onboarding endpoint. The `onboarding_date` must be in `YYYY-MM-DD` format.

**Request**

```bash
curl -X POST \
  -H "Authorization: YOUR_SESSION_ID" \
  -F "employee_id=V7S000000002005" \
  -F "onboarding_date=2026-03-27" \
  "https://{{vaultDNS}}/api/v26.1/custom/employee_onboarding"
```

When the call succeeds, Vault updates the `onboarded_date__c` field on the employee record with the date you provided.

### Success response

```json
{
  "responseStatus": "SUCCESS"
}
```

### Failure response

```json
{
  "responseStatus": "FAILURE",
  "errors": [
    {
      "type": "INVALID_DATA",
      "message": "..."
    }
  ]
}
```

> **Important:** Veeva Vault always returns HTTP `200`, even for failures. Always check the `responseStatus` field in the response body, not the HTTP status code.

---

## Troubleshooting

**`MALFORMED_URL` — "The specified resource cannot be found"**  
Your user is not in the HR WebAPI Group. Ask your Vault admin to add you before retrying.

**`INVALID_DATA` — "employee_id is required"**  
The `employee_id` parameter is missing or does not match an existing Vault record ID. Confirm the ID from the Vault UI URL or the bulk upload response.

**`INSUFFICIENT_ACCESS`**  
Your Vault user account does not have API access enabled. Contact your admin to update your security profile.

