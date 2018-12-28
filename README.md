## a RESTful API built using Javascript, NodeJS, and MongoDB.

### Requirements
- Node and npm

### Installation
- Clone the repo: `git clone git@github.com:Zoeee1616/case_study.git`
- Install dependencies: `npm install`
- To run the server locally: `node server.js`

### Example
- .../products/13860428 returns product detail (retrieved from redsky) and pricing (retrieved from MongoDB)
- .../products/13860429 returns product detail (retrieved from redsky) without pricing
- .../products/13860430 returns product not available (product not exists in redsky)
