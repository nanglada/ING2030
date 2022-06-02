# Endpoints
## restaurant CRUD
```
GET /api/restaurant/:id HTTP/1.1  
GET /api/restaurant/:id/reviews HTTP/1.1  
POST /api/restaurant/ HTTP/1.1  
PUT /api/restaurant/:id HTTP/1.1  
DELETE /api/restaurant/:id HTTP/1.1  
```
## review CRUD
```
GET /api/review/:id HTTP/1.1  
POST /api/review/ HTTP/1.1  
PUT /api/review/:id HTTP/1.1  
DELETE /api/review/:id HTTP/1.1  
```
## business CRUD
```
GET /api/business/:id HTTP/1.1  
POST /api/business/ HTTP/1.1  
PUT /api/business/:id HTTP/1.1  
DELETE /api/business/:id HTTP/1.1  
```
## client CRUD
```
GET /api/client/:id HTTP/1.1  
POST /api/client/ HTTP/1.1  
PUT /api/client/:id HTTP/1.1  
DELETE /api/client/:id HTTP/1.1  
```
## menu item CRUD
```
GET /api/menu/:id HTTP/1.1  
POST /api/menu/ HTTP/1.1  
PUT /api/menu/:id HTTP/1.1  
DELETE /api/menu/:id HTTP/1.1  
```
## image 
```
GET /img/:filename HTTP/1.1  
POST /api/restaurant/:id/img/ HTTP/1.1  (name=img)
POST /api/menu/:id/img/ HTTP/1.1        (name=img)
POST /api/review/:id/img/ HTTP/1.1      (name=img)
DELETE /api/restaurant/:id/img/ HTTP/1.1  (name=img)
DELETE /api/menu/:id/img/ HTTP/1.1        (name=img)
DELETE /api/review/:id/img/ HTTP/1.1      (name=img)
```