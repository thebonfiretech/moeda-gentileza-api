import investimentModel from "../../models/investiment.js";
import transactionModel from "../../models/transactions.js";
import userModel from "../../models/user.js";

export default class EconomyService {

    async addTransaction({author, type, description}){
        try {
            const transaction = new transactionModel({
                author, type, description
            });
            await transaction.save();
            return transaction;
        } catch (err) {
            return { error: "internal_error" } ;         
        }
    }

    async getTransactions(id){
        try {
            return await transactionModel.find({author: id});
        } catch (err) {
            return { error: "internal_error" } ;         
        }
    }

    async pix({from, to, value, description}){
        try {
            if (!from.ignore){
                var findUser = await userModel.findById(from.id);
                if (!findUser) return { error: "from_not_found"};

                if (findUser.wallet < value) return { error: "insuficient_wallet"};
                await userModel.findByIdAndUpdate(from.id, {$set: {wallet: (findUser.wallet - value)}}, {new: true, upsert: true});
                this.addTransaction({
                    type: 'pix',
                    author: from.id,
                    description: to.ignore ? `Teve ${value} gentilezas retiradas pelo sistema.` : `Realizou um pix de ${value} gentilezas para ${to.name}.`
                });
            }
            if (!to.ignore){
                var findUser = await userModel.findById(to.id);
                if (!findUser) return { error: "to_not_found"};

                await userModel.findByIdAndUpdate(to.id, {$set: {wallet: (findUser.wallet + value)}}, {new: true, upsert: true});
                this.addTransaction({
                    type: 'pix',
                    author: to.id,
                    description: from.ignore ? `Recebeu ${value} gentilezas enviadas pelo sistema.` : `Recebeu um pix de ${value} gentilezas de ${from.name}.`
                });
            }
            return {};
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }

}