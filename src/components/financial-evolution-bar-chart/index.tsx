import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import ptBRLocale from "dayjs/locale/pt-br";
import { useMemo } from "react";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/format-currency";

dayjs.locale(ptBRLocale);

const apiData = [
  {
    _id: {
      year: 2024,
      month: 1,
    },
    balance: 888888,
    incomes: 322313,
    expenses: 987350,
  },
  {
    _id: {
      year: 2024,
      month: 2,
    },
    balance: 188888,
    incomes: 522313,
    expenses: 387350,
  },
  {
    _id: {
      year: 2024,
      month: 3,
    },
    balance: 588888,
    incomes: 822313,
    expenses: 187350,
  },
];

type ChartData = {
  month: string;
  Saldo: number;
  Receitas: number;
  Gastos: number;
};

export function FinacialEvolutionBarChart() {
  const data = useMemo<ChartData[]>(() => {
    const chartData: ChartData[] = apiData.map((item) => ({
      month: dayjs(`${item._id.year}-${item._id.month}-01`).format("MMM"),
      Saldo: item.balance,
      Receitas: item.incomes,
      Gastos: item.expenses,
    }));
    return chartData;
  }, []);
  return (
    <ResponsiveBar
      data={data}
      keys={["Saldo", "Receitas", "Gastos"]}
      colors={[theme.colors.success, theme.colors.primary, theme.colors.error]}
      indexBy={"month"}
      groupMode="grouped"
      enableLabel={false}
      enableGridY={false}
      padding={0.2}
      axisLeft={{
        tickSize: 0,
        format: formatCurrency,
      }}
      margin={{ left: 88, bottom: 28 }}
      theme={{
        text: {
          fontFamily: "Lexend",
          fontSize: 10,
        },
        axis: {
          ticks: {
            text: {
              fill: theme.colors.white,
            },
          },
        },
        tooltip: {
          container: {
            backgroundColor: theme.colors.black,
            padding: 16,
            color: theme.colors.white,
            fontFamily: "Lexend",
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      valueFormat={formatCurrency}
    />
  );
}
