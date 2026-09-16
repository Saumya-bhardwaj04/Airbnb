# Vacation-Rental Marketplace Architecture

This diagram illustrates a high-level, production-scale architecture for a vacation-rental marketplace (like Airbnb).

```mermaid
flowchart TD
    %% Users and Edge
    User[User / Client App]
    CDN[CDN / Edge Network\n(Cloudflare / AWS CloudFront)]
    DNS[DNS Routing\n(Route 53)]

    %% API Gateway and Load Balancing
    ALB[Application Load Balancer]
    API_GW[API Gateway\n(Kong / AWS API Gateway)]

    %% Frontend Services
    FE_Service[Frontend Service\n(Next.js App Runners)]
    
    %% Microservices
    subgraph Microservices [Backend Microservices]
        User_Svc[User Service\n(Auth, Profiles)]
        Listing_Svc[Listing Service\n(Properties, Availabilities)]
        Search_Svc[Search Service\n(Geospatial, Filtering)]
        Booking_Svc[Booking & Payment Service\n(Transactions)]
        Review_Svc[Review Service\n(Ratings, Comments)]
        Message_Svc[Messaging Service\n(Real-time Chat)]
    end

    %% Databases & Storage
    subgraph Storage [Data Layer]
        Auth_DB[(User DB\nPostgreSQL)]
        Listing_DB[(Listing DB\nPostgreSQL)]
        Search_Engine[(Search Index\nElasticsearch)]
        Booking_DB[(Booking DB\nCockroachDB/PostgreSQL)]
        Review_DB[(Review DB\nMongoDB)]
        Message_DB[(Chat DB\nCassandra)]
    end

    %% Caching Layer
    Cache[(Redis Cache\nSession, Fast Lookups)]

    %% Media Storage
    Object_Store[(Object Storage\nAWS S3 / GCS)]

    %% Async & Events
    Event_Bus[[Event Bus / Message Queue\n(Kafka / RabbitMQ)]]

    %% Connections
    User --> DNS
    DNS --> CDN
    CDN --> ALB
    ALB --> FE_Service
    FE_Service --> API_GW
    User --> API_GW
    
    API_GW --> User_Svc
    API_GW --> Listing_Svc
    API_GW --> Search_Svc
    API_GW --> Booking_Svc
    API_GW --> Review_Svc
    API_GW --> Message_Svc

    User_Svc --> Auth_DB
    Listing_Svc --> Listing_DB
    Search_Svc --> Search_Engine
    Booking_Svc --> Booking_DB
    Review_Svc --> Review_DB
    Message_Svc --> Message_DB
    
    %% Storage links
    Listing_Svc --> Object_Store
    User_Svc --> Object_Store

    %% Caching
    Listing_Svc -.-> Cache
    Search_Svc -.-> Cache
    User_Svc -.-> Cache

    %% Event Bus Connections
    Booking_Svc -.-> Event_Bus
    Listing_Svc -.-> Event_Bus
    User_Svc -.-> Event_Bus
    Event_Bus -.-> Search_Svc
    Event_Bus -.-> Review_Svc
    Event_Bus -.-> Message_Svc
```

## Scaling Strategy

1.  **Frontend & Edge:**
    *   **CDN:** Assets (images, JS, CSS) and statically generated pages are cached at edge locations worldwide.
    *   **Frontend Service:** Deployed on auto-scaling container platforms (e.g., Vercel, AWS ECS, or Kubernetes) to handle varying traffic loads dynamically.

2.  **Backend Services:**
    *   **Microservices Architecture:** Services are decoupled by business domains (Users, Listings, Search, Booking). This allows independent scaling. For example, the Search Service can scale massively during high traffic, separately from the Booking Service.
    *   **API Gateway:** Handles rate limiting, authentication, and routing, offloading these concerns from the microservices.

3.  **Data Storage:**
    *   **Relational Databases (PostgreSQL / CockroachDB):** Used for transactional data requiring strong consistency (Bookings, Listings). Scaled horizontally via read replicas.
    *   **NoSQL (MongoDB / Cassandra):** Used for flexible schemas and high-write volumes (Reviews, Messaging).
    *   **Search (Elasticsearch):** Optimized for complex, geospatial, and text-based queries critical for finding listings.

4.  **Caching:**
    *   **Redis:** Crucial for caching frequent API responses, user sessions, and database query results, drastically reducing DB load.

5.  **Asynchronous Processing:**
    *   **Kafka:** Acts as the central nervous system. When a booking occurs, events are published here. Other services (like Search for updating availability, or Notification services for sending emails) subscribe to these events, ensuring non-blocking operations and eventual consistency.

6.  **Media Assets:**
    *   **Object Storage (S3):** All listing photos are stored here, with a CDN sitting in front to deliver optimized image formats (WebP) globally.
