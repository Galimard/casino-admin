// import { useForm } from 'react-hook-form';
// import { Button } from 'react-bootstrap';
// import DatePicker from './DatePicker';
import classes from './styles.module.scss';
import ExportForm from './ui/export-form/ExportForm';

// type ExportData = {
//   dateRange: string;
// };

export default function ExportContent() {
  // const { handleSubmit, control } = useForm<ExportData>();

  // const onSubmit = (data: ExportData) => {
  //   console.log(data);
  //   // Export logic here
  // };

  return (
    <div className={classes.export}>
      <h1 className="typography-h1">Администратор login</h1>

      <ExportForm />
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="form-label">Указать период</label>
          <DatePicker name="dateRange" control={control} />
        </div>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Экспорт данных в Excel
        </Button>

        <Button variant="outline-secondary" className="w-100">
          Выйти
        </Button>
      </form> */}
    </div>
  );
}