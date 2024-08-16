import axios from 'axios';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { name, companyName, email, phoneNumber, services, message } = req.body;
        try {
            const response = await axios.post('https://api.example.com/contact', req.body);
            res.status(200).json({ ...response.data, status: 'success', message: 'Message sent successfully' });
        } catch (error) {
            res.status(500).json({message: 'An error occurred while sending the message'});
        }
    }else {
        res.setHandler('Allow', ['POST']);
        res.status(405).json({message: 'Method not allowed'});
    }
}