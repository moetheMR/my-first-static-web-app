const { app } = require('@azure/functions');

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const name = request.query.get('name') || (await request.text()).trim() || 'World';
            const response = {
                success: true,
                data: { text: `Hello, from the API${name ? ', ' + name : ''}!` }
            };
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response)
            };
        } catch (err) {
            context.log.error('API error', err);
            return {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: false, error: 'Internal Server Error' })
            };
        }
    }
});
