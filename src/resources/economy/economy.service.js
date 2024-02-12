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
            return await transactionModel.find({author: id}).sort({date: -1});
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

    async updateInvestment({ id, data}){
        try {
            var investiment = await investimentModel.findByIdAndUpdate(id, {$set: {...data}}, {new: true, upsert: true});
            return investiment;
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async createInvestment({ name, description, percentage, penalty }){ 
        try {
            const investiment = new investimentModel({
                name, percentage, penalty, description
            });
            await investiment.save();
            return investiment;
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getInvestment(){
        try {
            return await investimentModel.find().sort({date: -1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async addUserInvestment(id, {investiment, value}){
        try {
                const user = await userModel.findById(id);
                if (!user) return { error: "user_not_found"};
                if (user.wallet < value) return { error: "insuficient_wallet"};

                var newInvestments;
                var hasInvestment = user.investments.find(x => x.id == investiment._id);
                if (!hasInvestment) {

                    newInvestments = [
                        ...user.investments,
                        {
                            ...investiment,
                            id: investiment._id,
                            wallet: value,
                            lastUpdate: Date.now(),
                            initialDate: Date.now()
                        }
                    ]
                } else {
                    var findInvestmentIndex = user.investments.findIndex(x => x.id == investiment._id);
                    newInvestments = user.investments;
                    newInvestments[findInvestmentIndex].lastUpdate = Date.now();
                    newInvestments[findInvestmentIndex].wallet = (newInvestments[findInvestmentIndex].wallet + value);

                } 

                var newUser = await userModel.findByIdAndUpdate(id, {$set: {
                    wallet: (user.wallet - value),
                    investments: newInvestments
                }}, {new: true, upsert: true});

                this.addTransaction({
                    type: 'transaction',
                    author: id,
                    description: `Adicionou ${value} gentilezas no investimento ${investiment?.name}`
                });

                return newUser;

        } catch (err) {
            console.log(err)
            return { error: "internal_error" } ;
        }
    }

}