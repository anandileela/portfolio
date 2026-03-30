---
layout: ../layouts/MarkdownLayout.astro
title: Employee Onboarding API - Technical Writer Assignment
---

# Employee Onboarding API

Updates employee records' onboarded date. Only employees who are already onboarded can call HR APIs.

## Requirements

**Available in:** Vault API v26.1+  
**Permission required:** HR WebAPI Group

---

## Endpoint

```
POST https://{{vaultDNS}}/api/{{version}}/custom/employee_onboarding
```

---

## Permissions

Requires membership in the **HR WebAPI Group**. Requests from users outside this group return a `MALFORMED_URL` error regardless of other permissions. Contact your Vault admin to request access.

---

## Headers

| Name | Type | Required | Description |
|---|---|---|---|
| `Authorization` | string | Yes | Your Vault session ID obtained from the `/auth` endpoint. |
| `Content-Type` | string | Yes | Must be `multipart/form-data`. |

---

## Body parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `employee_id` | string | Yes | The Vault record ID of the employee to onboard. Must correspond to an existing employee record. Example: `V7S000000002005` |
| `onboarding_date` | string | Yes | The date to set as the employee's onboarded date. Format: `YYYY-MM-DD`. Example: `2026-03-27` |

---

## Example request

```bash
# Replace YOUR_SESSION_ID with your Vault session token

curl -X POST \
  -H "Authorization: YOUR_SESSION_ID" \
  -F "employee_id=V7S000000002005" \
  -F "onboarding_date=2026-03-27" \
  "https://{{vaultDNS}}/api/{{version}}/custom/employee_onboarding"
```

---

## Responses

Vault always returns HTTP `200` — even for failures. Always check the `responseStatus` field in the response body, not the HTTP status code.

### Success

```json
{
  "responseStatus": "SUCCESS"
}
```

### Failure

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

---

## Errors

| Type | HTTP status | Description |
|---|---|---|
| `MALFORMED_URL` | 200 | The requesting user is not a member of the HR WebAPI Group. Message: `"The specified resource cannot be found"` |
| `INVALID_DATA` | 200 | The `employee_id` does not match an existing employee record, or a required parameter is missing. Message: `"employee_id is required"` / `"invalid employee ID"` |

