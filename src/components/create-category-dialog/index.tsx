import { useCallback, useState } from "react";
import { Dialog } from "../dialog";
import { Container } from "./styles";
import { Button } from "../button";
import { Title } from "../title";
import { Input } from "../input";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    handleClose();
  }, [handleClose]);

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
        <form>
          <div>
            <Input label="Nome" placeholder="Nome da ategoria" />
            <Input label="Cor" type="color" />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit} variant="outline" type="button">
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
