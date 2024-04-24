import { useCallback, useState } from "react";
import { Dialog } from "../dialog";
import { Container } from "./styles";
import { Button } from "../button";
import { Title } from "../title";
import { Input } from "../input";
import { theme } from "../../styles/theme";
import { createCategorySchema } from "../../validators/schemas";
import { CreateCategoryDate } from "../../validators/types";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type CreateCategoryData = CreateCategoryDate;

export function CreateCategoryDialog() {
  const { createCategory, fetchCategories } = useFetchAPI();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<CreateCategoryData>({
    defaulValues: {
      title: "",
      color: theme.colors.primary,
    },
    resolver: zodResolver(createCategorySchema),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateCategoryDate) => {
      await createCategory(data);
      handleClose();
      await fetchCategories();
    },
    [handleClose, createCategory, fetchCategories]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Nova Categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da ategoria"
              {...register("title")}
              error={formState.errors?.title?.message}
            />
            <Input
              label="Cor"
              type="color"
              {...register("title")}
              error={formState.errors?.title?.message}
            />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button variant="outline" type="submit">
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
