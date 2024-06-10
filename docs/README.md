# Backend

This document provides an overview of the database tables and API request parameters used in the backend of the application.

## Database Tables

### Gloss
| Field       | Type      |
|-------------|-----------|
| ID          | Long      |
| AuthorID    | Long      |
| PartOfSpeach| String    |
| Lang        | String    |
| Text        | String    |
| Comment     | String    |
| Created     | Timestamp |
| Modified    | Timestamp |

*Note: Fields for edit form on frontend are PartOfSpeach, Lang, Text, Comment.*

*Question: Should we have authorID who modified the gloss?*

### Link
| Field         | Type       |
|---------------|------------|
| ID            | Long       |
| FirstID       | Long       |
| SecondID      | Long       |
| FirstLang     | String     |
| SecondLang    | String     |
| Created       | Timestamp  |
| Modified      | Timestamp  |

*Note: FirstID, FirstLang is always Kazakh*

### Author
| Field       | Type      |
|-------------|-----------|
| Name        | String    |
| Email       | String    |
| Type        | String    |
| Created     | Timestamp |
| Modified    | Timestamp |
| Deactivated | Timestamp |

*Note: Guest and Dataload are also authors, but they do not have an email.*

### Likes
| Field    | Type      |
|----------|-----------|
| ID       | Long      |
| AuthorID | Long      |
| LinkID   | Long      |
| Created  | Timestamp |
| Modified | Timestamp |

### Dislikes
| Field    | Type      |
|----------|-----------|
| ID       | Long      |
| AuthorID | Long      |
| LinkID   | Long      |
| Created  | Timestamp |
| Modified | Timestamp |

### Acknowledgements
| Field    | Type      |
|----------|-----------|
| ID       | Long      |
| AuthorID | Long      |
| LinkID   | Long      |
| Created  | Timestamp |
| Modified | Timestamp |

## API Request Parameters

### GET: Get links

`/api/v1/get/links`

| Parameter | Description           | Required |
|-----------|-----------------------|----------|
| q         | Query                 | Yes      |
| src       | Source Language       | Yes      |
| dst       | Destination Language  | Yes      |
| limit     | Limit                 | No       |

### POST: Create a link

`/api/v1/create/link`

| Parameter | Description          | Required |
|-----------|----------------------|----------|
| q         | Query                | Yes      |
| src       | Source Language      | Yes      |
| dst       | Destination Language | Yes      |
| srcGloss  | Source Gloss         | Yes      |
| dstGloss  | Destination Gloss    | Yes      |

*Note: Language values are kk, en, ru.*