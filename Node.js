const fs = require("fs");
const http = require("http");
const json = fs.readFileSync('products.json', 'utf-8');
const products = JSON.parse(json);

const server = http.createServer((request, response) => {
    let path = request.url;
    if (path === '/' || path === '/home') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<h1>Hello KMIT!</h1>');
    }
    else if (path === '/products') {
        let productRows = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
            </tr>
        `).join('');

        let html = `
            <html>
                <body>
                    <h1>Product List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody id="productTable">
                            ${productRows}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }
    else {
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'myHeader': 'Hello, error'
        });
        response.end('<h1>Error 404: Page not found</h1>');
    }
});
server.listen(3000, '10.10.7.11', () => {
    console.log("Server is running");
});








