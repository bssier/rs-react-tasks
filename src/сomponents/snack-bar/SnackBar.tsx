export const SnackBar = ({ message }: { message: string }) => (
  <div className="snack-bar">
    <div className="message-container">
      <p>{message}</p>
    </div>
  </div>
);
