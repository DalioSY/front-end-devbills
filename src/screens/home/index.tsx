import { InputMask } from "@react-input/mask";

import { ButtonIcon } from "../../components/button-icon";
import { Card } from "../../components/card";
import {
  CategoriesPieChat,
  CategoryProps,
} from "../../components/categories-pie-chart";
import { CreateCategoryDialog } from "../../components/create-category-dialog";
import { CreateTransactionDialog } from "../../components/create-transaction-dialog";
import { FinacialEvolutionBarChart } from "../../components/financial-evolution-bar-chart";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { Title } from "../../components/title";
import { Transaction } from "../../components/transaction";
import {
  Aside,
  Balance,
  ChartAction,
  ChartContent,
  ChartContainer,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from "./styles";
import { TransactionFilterDate } from "../../validators/types";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionFilterDateSchema } from "../../validators/schemas";
import { Category } from "../../services/api-types";
import { useCallback, useEffect, useState } from "react";
import { useFetchAPI } from "../../hooks/useFetchAPI";

export function Home() {
  const transactionsFilterForm = useForm<TransactionFilterDate>({
    defaultValues: {
      title: "",
      categoryId: "",
      beginDate: dayjs().startOf("month").format("DD/MM/YYYY"),
      endDate: dayjs().endOf("month").format("DD/MM/YYYY"),
    },
    resolver: zodResolver(transactionFilterDateSchema),
  });

  const { transactions, fetchTransactions } = useFetchAPI();

  useEffect(() => {
    fetchTransactions(transactionsFilterForm.getValues());
  }, [fetchTransactions, transactionsFilterForm]);

  const [sekectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const handleSelectCategory = useCallback(
    ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color });
      transactionsFilterForm.setValue("categoryId", id);
    },
    [transactionsFilterForm]
  );

  const handleDeselectCategory = useCallback(() => {
    setSelectedCategory(null);
    transactionsFilterForm.setValue("categoryId", "");
  }, [transactionsFilterForm]);

  const onSubmitTransactions = useCallback(
    async (data: TransactionFilterDate) => {
      await fetchTransactions(data);
    },
    [fetchTransactions]
  );

  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Inicio"
                placeholder="dd/mm/aaaa"
                error={
                  transactionsFilterForm.formState.errors.beginDate?.message
                }
                {...transactionsFilterForm.register("beginDate")}
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
                error={
                  transactionsFilterForm.formState.errors.beginDate?.message
                }
                {...transactionsFilterForm.register("endDate")}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(
                  onSubmitTransactions
                )}
              />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={1000000} />
            <Card title="Saldo" amount={1000000} variant="incomes" />
            <Card title="Saldo" amount={1000000} variant="expenses" />
          </Balance>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categoria no período"
              />
            </header>
            <ChartContent>
              <CategoriesPieChat onClick={handleSelectCategory} />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinacialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title
              title="Transações"
              subtitle="Receitas e Gastos no periodo"
              {...transactionsFilterForm.register("title")}
            />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação" />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(
                  onSubmitTransactions
                )}
              />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            {transactions?.length &&
              transactions.map((item, index) => (
                <Transaction
                  key={item._id}
                  id={index + 1}
                  amount={
                    item.type === "expense" ? item.amount * -1 : item.amount
                  }
                  date={dayjs(item.date).add(3, "hours").format("DD/MM/YYYY")}
                  category={{
                    title: item.category.title,
                    color: item.category.color,
                  }}
                  title={item.title}
                  variant={item.type}
                />
              ))}
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
