import React from 'react';

interface User {
    id : number;
    name : string;
    token : any;
    numen : number;
    email : any;
    status : 'not_confirmed' | 'activate' | 'unactive';
    created_at : string;
}
