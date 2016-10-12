# Getting Started on API Connect

**Learn the basics of API Connect by using these guides to build micro services and api proxies.**

## Building an API Proxy

- Creating your first Assembly
- Exposing SOAP services as REST APIs
  1. Create API defn.
  1. Create target service
     - Provide URL of WSDL file
  1. Create operation switch
  1. Add case for getForecastByZip
  1. Add map for request
     - Select payload defn. left side, right side
     - zip, weatherCit, Country
  1. Add invoke policy 
     - http://xxx.api.yahoo.com
     - Set method to POST
     - Add set-variable
       - Header
       - SOAP OpID (TBD)
     - Add response map (zip -> zip, weatherCity -> city, XML -> json)
     
  - Invoking a Micro Service from an API Proxy
  - Deploying Assemblies to Bluemix
  
## Building Micro Services

- Creating a Hello World Micro Service
- Orchestrating SOAP services with LoopBack
- Deploying LoopBack Applications to Bluemix
  
## Organizing APIs

- Version controlling your API Connect Project
- Creating your first Product and API Definition
- Publishing a Product to a Catalog on Bluemix
  
## Glossary

  - `apic` CLI
  - API Definition
  - API Designer
  - API Proxy
  - Assembly
  - Gateway
  - Micro Service
  - Open API
  - LoopBack
  - Product
  - Project
  - Swagger
  - YAML
