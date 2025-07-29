# API Testing Examples

This file contains PowerShell commands to test all the API endpoints.

## Users CRUD Operations

### 1. Create Users
```powershell
# Create first user
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "John Doe", "email": "john@example.com"}'

# Create second user
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Jane Smith", "email": "jane@example.com"}'

# Create third user
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Bob Wilson", "email": "bob@example.com"}'
```

### 2. Get All Users
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET
```

### 3. Get User by ID
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method GET
```

### 4. Update User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method PUT -ContentType "application/json" -Body '{"name": "John Updated", "email": "john.updated@example.com"}'
```

### 5. Delete User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/3" -Method DELETE
```

## Posts CRUD Operations

### 1. Create Posts
```powershell
# Create first post
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title": "My First Post", "content": "Hello World! This is my first blog post.", "published": true, "authorId": 1}'

# Create second post (draft)
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title": "Draft Post", "content": "This is a draft post", "published": false, "authorId": 1}'

# Create third post by another author
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title": "Another Author Post", "content": "This post is by Jane", "published": true, "authorId": 2}'
```

### 2. Get All Posts
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method GET
```

### 3. Get Published Posts Only
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/published" -Method GET
```

### 4. Get Posts by Author
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/author/1" -Method GET
```

### 5. Get Post by ID
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method GET
```

### 6. Update Post
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/2" -Method PUT -ContentType "application/json" -Body '{"title": "Updated Draft Post", "content": "This draft has been updated", "published": true}'
```

### 7. Delete Post
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method DELETE
```

## Other Endpoints

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET
```

### API Info
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/" -Method GET
```

## Error Testing

### Test Invalid User ID
```powershell
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/users/999" -Method GET
} catch {
    Write-Output "Expected 404 error: $($_.Exception.Message)"
}
```

### Test Duplicate Email
```powershell
# First create a user
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Test User", "email": "test@example.com"}'

# Try to create another user with same email
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Another User", "email": "test@example.com"}'
} catch {
    Write-Output "Expected 409 error: $($_.Exception.Message)"
}
```

### Test Missing Required Fields
```powershell
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "No Email User"}'
} catch {
    Write-Output "Expected 400 error: $($_.Exception.Message)"
}
```

## Complete Test Sequence

Run this to test the complete workflow:

```powershell
# Create users
$user1 = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Alice", "email": "alice@example.com"}'
$user2 = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name": "Charlie", "email": "charlie@example.com"}'

Write-Output "Created users:"
Write-Output $user1
Write-Output $user2

# Create posts
$post1 = Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title": "Alice First Post", "content": "Hello from Alice!", "published": true, "authorId": 1}'
$post2 = Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title": "Charlie First Post", "content": "Hello from Charlie!", "published": true, "authorId": 2}'

Write-Output "Created posts:"
Write-Output $post1
Write-Output $post2

# Get all data
$allUsers = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET
$allPosts = Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method GET

Write-Output "All users:"
Write-Output $allUsers.data

Write-Output "All posts:"
Write-Output $allPosts.data
```
