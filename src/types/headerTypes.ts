export type HeaderTypes = {
  inputValue: string;
  snackBarMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: () => void;
  handleToPokemonListClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleEnterClick: (e: React.KeyboardEvent) => void;
  generateError: () => void;
};

export type SnackBar = {
  message: string;
  showMessage: (msg: string) => void;
};
