import { InputMask } from "@react-input/mask";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { Title } from "../../components/title";
import {
  Header,
  Main,
  Section,
  Filters,
  InputGroup,
  Balance,
  ChartContainer,
  ChartContent,
  ChartAction,
  Aside,
  SearchTransaction,
  TransactionGroup,
} from "./styles";
import { ButtonIcon } from "../../components/button-icon";
import { Card } from "../../components/card";
import { Transaction } from "../../components/transaction";
import { CreateCategoryDialog } from "../../components/create-category-dialog";
import { CreateTransactionDialog } from "../../components/create-transaction-dialog";
import { CategoriesPieChat } from "../../components/categories-pie-chart";
import { FinacialEvolutionBarChart } from "../../components/financial-evolution-bar-chart";

export function Home() {
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
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIcon />
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
              <CategoriesPieChat />
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
            <Title title="Transações" subtitle="Receitas e Gastos no periodo" />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação" />
              <ButtonIcon />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            <Transaction
              id={1}
              amount={20000}
              date="10/10/2024"
              category={{ title: "Alimentação", color: "#551215" }}
              title="Mercado"
            />
            <Transaction
              id={1}
              amount={20000}
              date="10/10/2024"
              category={{ title: "Alimentação", color: "#551215" }}
              title="Mercado"
            />
            <Transaction
              id={1}
              amount={20000}
              date="10/10/2024"
              category={{ title: "Alimentação", color: "#551215" }}
              title="Mercado"
            />
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
