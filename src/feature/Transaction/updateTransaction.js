const DetailedAccountModel = require("../../models/DetailedAccount");

const updateTransaction = async ({
  id,
  accountId,
  transaction,
  repository,
}) => {
  const transactionExists = await repository.getById(id);

  if (
    !transactionExists ||
    transactionExists.accountId.toString() !== accountId
  ) {
    return null;
  }

  const shouldReverseValue =
    (transaction.type === "Debit" && transaction.value > 0) ||
    (transaction.type === "Credit" && transaction.value < 0);
  if (shouldReverseValue) transaction.value = transaction.value * -1;

  const resultado = await repository.update(id, transaction);
  return resultado ? new DetailedAccountModel(resultado.toJSON()) : null;
};

module.exports = updateTransaction;
