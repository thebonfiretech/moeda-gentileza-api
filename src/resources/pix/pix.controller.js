import PixService from './pix.services.js';


export default class PixController {
        
        async pay(req, res){
                const pixService = new PixService();
                const response = await pixService.pay ();
                return { response };
        }

        async request(req, res){
                const pixService = new PixService();
                const response = await pixService.request();
                return { response };
        }

        
        async extract(req, res){
                const pixService = new PixService();
                const response = await pixService.extract();
                return { response };
        }

        async getQrcode(req, res){
                const pixService = new PixService();
                const response = await pixService.getQrcode();
                return { response };
        }
}