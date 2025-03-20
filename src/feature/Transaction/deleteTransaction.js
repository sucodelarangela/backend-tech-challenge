const deleteTransaction = async ({ id, accountId, repository }) => {
  const transactionExists = await repository.getById(id);

  if (
    !transactionExists ||
    transactionExists.accountId.toString() !== accountId
  ) {
    return false; // Transação não encontrada ou não pertence à conta
  }

  const resultado = await repository.remove(id);
  return !!resultado;
};

module.exports = deleteTransaction;
