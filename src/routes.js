const { Router } = require("express");
const AccountController = require("./controller/Account");
const accountController = new AccountController({});
const router = Router();

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Busca contas
 *     tags: [Contas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas encontradas
 */
router.get("/account", accountController.find.bind(accountController));

/**
 * @swagger
 * /account/transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               value:
 *                 type: number
 *               type:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               anexo:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 */
router.post(
  "/account/transaction",
  accountController.createTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/transaction/update/{transactionId}:
 *   put:
 *     summary: Atualiza uma transação
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountId
 *               - value
 *               - type
 *             properties:
 *               accountId:
 *                 type: string
 *               value:
 *                 type: number
 *               type:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               anexo:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID da transação
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação atualizada
 *       401:
 *         description: Token invalido
 */
router.put(
  "/account/transaction/update/:transactionId",
  accountController.updateTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/transaction/delete:
 *   delete:
 *     summary: Exclui uma transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accountId
 *         required: true
 *         description: "ID da conta associada à transação."
 *         schema:
 *           type: string
 *           example: "123456"
 *       - in: query
 *         name: transactionId
 *         required: true
 *         description: "ID da transação a ser excluída."
 *         schema:
 *           type: string
 *           example: "78910"
 *     responses:
 *       200:
 *         description: Transação excluída com sucesso.
 *       400:
 *         description: Parâmetros obrigatórios ausentes.
 *       401:
 *         description: Token inválido.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Transação não encontrada.
 */
router.delete(
  "/account/transaction/delete",
  accountController.deleteTransaction.bind(accountController)
);

/**
 * @swagger
 * /account/{accountId}/statement:
 *   get:
 *     summary: Obtém extrato da conta
 *     tags: [Extratos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extrato encontrado
 *       401:
 *         description: Token invalido
 */
router.get(
  "/account/:accountId/statement",
  accountController.getStatment.bind(accountController)
);

module.exports = router;
