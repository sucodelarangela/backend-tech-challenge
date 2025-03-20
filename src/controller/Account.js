const TransactionDTO = require("../models/DetailedAccount");

class AccountController {
  constructor(di = {}) {
    this.di = Object.assign(
      {
        userRepository: require("../infra/mongoose/repository/userRepository"),
        accountRepository: require("../infra/mongoose/repository/accountRepository"),
        cardRepository: require("../infra/mongoose/repository/cardRepository"),
        transactionRepository: require("../infra/mongoose/repository/detailedAccountRepository"),

        saveCard: require("../feature/Card/saveCard"),
        salvarUsuario: require("../feature/User/salvarUsuario"),
        saveAccount: require("../feature/Account/saveAccount"),
        getUser: require("../feature/User/getUser"),
        getAccount: require("../feature/Account/getAccount"),
        updateTransaction: require("../feature/Transaction/updateTransaction"),
        saveTransaction: require("../feature/Transaction/saveTransaction"),
        deleteTransaction: require("../feature/Transaction/deleteTransaction"),
        getTransaction: require("../feature/Transaction/getTransaction"),
        getCard: require("../feature/Card/getCard"),
      },
      di
    );
  }

  async find(req, res) {
    const {
      accountRepository,
      getAccount,
      getCard,
      getTransaction,
      transactionRepository,
      cardRepository,
    } = this.di;

    try {
      const userId = req.user.id;
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId },
      });
      const transactions = await getTransaction({
        filter: { accountId: account[0].id },
        repository: transactionRepository,
      });
      const cards = await getCard({
        filter: { accountId: account[0].id },
        repository: cardRepository,
      });

      const balance = transactions.reduce((total, transaction) => {
        return total + (transaction.value || 0);
      }, 0);

      res.status(200).json({
        message: "Conta encontrada carregado com sucesso",
        result: {
          account: [{ ...account[0], balance }],
          transactions,
          cards,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro no servidor",
      });
    }
  }

  async createTransaction(req, res) {
    const { saveTransaction, transactionRepository } = this.di;
    const { accountId, value, type, from, to, anexo } = req.body;
    const transactionDTO = new TransactionDTO({
      accountId,
      value,
      from,
      to,
      anexo,
      type,
      date: new Date(),
    });

    const transaction = await saveTransaction({
      transaction: transactionDTO,
      repository: transactionRepository,
    });

    res.status(201).json({
      message: "Transação criada com sucesso",
      result: transaction,
    });
  }

  async updateTransaction(req, res) {
    const {
      updateTransaction,
      transactionRepository,
      getAccount,
      accountRepository,
    } = this.di;
    const { transactionId } = req.params;
    const { accountId, value, type, from, to, anexo } = req.body;
    const userId = req.user.id;

    try {
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId, _id: accountId },
      });

      if (!account || account.length === 0) {
        return res.status(403).json({
          message: "Acesso negado à conta especificada ou conta não encontrada",
        });
      }

      const transactionDTO = {
        value,
        from,
        to,
        anexo,
        type,
      };

      const transaction = await updateTransaction({
        id: transactionId,
        accountId,
        transaction: transactionDTO,
        repository: transactionRepository,
      });

      if (!transaction) {
        return res.status(404).json({
          message:
            "Transação não encontrada ou não pertence à conta especificada",
        });
      }

      res.status(200).json({
        message: "Transação atualizada com sucesso",
        result: transaction,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar a transação",
        error: error.message,
      });
    }
  }

  async deleteTransaction(req, res) {
    const {
      deleteTransaction,
      transactionRepository,
      getAccount,
      accountRepository,
    } = this.di;
    const { transactionId, accountId } = req.query;
    const userId = req.user.id;

    try {
      if (!transactionId || !accountId) {
        return res.status(400).json({
          message:
            "Parâmetros obrigatórios ausentes: transactionId e accountId são necessários",
        });
      }

      const account = await getAccount({
        repository: accountRepository,
        filter: { userId, _id: accountId },
      });

      if (!account || account.length === 0) {
        return res.status(403).json({
          message: "Acesso negado à conta especificada",
        });
      }

      const result = await deleteTransaction({
        id: transactionId,
        accountId,
        repository: transactionRepository,
      });

      if (!result) {
        return res.status(404).json({
          message:
            "Transação não encontrada ou não pertence à conta especificada",
        });
      }

      res.status(200).json({
        message: "Transação excluída com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao excluir a transação",
        error: error.message,
      });
    }
  }

  async getStatment(req, res) {
    const { getTransaction, transactionRepository } = this.di;

    const { accountId } = req.params;

    const transactions = await getTransaction({
      filter: { accountId },
      repository: transactionRepository,
    });
    res.status(201).json({
      message: "Transações carregadas com sucesso",
      result: {
        transactions,
      },
    });
  }
}

module.exports = AccountController;
