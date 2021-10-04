# hbb-health

#### Table medical history - gets and adds medical entries
- add medical history entry
- get medical history
- edit medical history
- delete medical history

# hbb-person
 
 1. write the API contract
 2. based on the API routes and what they do, figure what the database structure should look like
 
#### Operations
- create medical history 
- get medical history
- edit medical history
- delete medical history

# hbb-person API contract:

POST /history/
- payload:
    - userId
    - Childhood ilnesses
    - Major adult ilnesses
    - Surgeries
    - Prior injuries
    - Medications
    - Allergies
    
-> the request handler will validate that these properties exist on the payload
-> the request handler will insert an entry into the transactions table from the DB

GET /history/:userId
- no payload as it is a GET request
-> the request handler will select the requested history from the db

PUT /history/:userId/edit
- payload:
        - userId
        - Childhood ilnesses
        - Major adult ilnesses
        - Surgeries
        - Prior injuries
        - Medications
        - Allergies
-> the request handler will select the requested history from db and will update the information with the new payload

DELETE /history/:userId/delete

-> the request handler will delete the selected user






