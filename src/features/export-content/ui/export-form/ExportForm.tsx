import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import axios from 'axios';
import { convertDate } from '@helpers/convertDate';
import classes from '../../styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarSvg } from '@assets/icons/CalendarSvg';

const validateToken = async (token: string) => {
  try {
    const response = await axios.get('/api/validate-token', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.isValid;
  } catch (error) {
    console.log(error);    
    return false;
  }
};

const ExportForm = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(null);
  const [errors, setErrors] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const savedToken = localStorage.getItem("authToken");  

  useEffect(() => {
    const checkToken = async () => {
      if (!savedToken) {
        navigate('/');
        return;
      }
  
      const isValid = await validateToken(savedToken);
      if (!isValid) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };
  
    checkToken();
  }, [navigate, savedToken]);

  const validateForm = () => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      setErrors('Укажите период');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsExporting(true);

    const dateStart = dateRange?.[0] ? convertDate(dateRange[0]) : '';
    const dateEnd = dateRange?.[1] ? convertDate(dateRange[1]) : '';

    const apiUrl = `https://bitrix-api.mantera.digital/rest/mdigital_combinationsraffle.combinations?auth=${savedToken}&action=getXlsByDate&dateStart=${dateStart}&dateEnd=${dateEnd}`;
    // const apiUrl = `/api/rest/mdigital_combinationsraffle.combinations?auth=${savedToken}&action=getXlsByDate&dateStart=${dateStart}&dateEnd=${dateEnd}`;

    axios.get(apiUrl)
      .then(function (response) {
        console.log('response', response);
        if (response.data?.result !== '') {  
          const downloadUrl = response.data.result;
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'exported_file.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setErrors('На выбранные даты нет данных');          
        }
        setIsExporting(false);
      })
      .catch(function (error) {
        console.log('error', error);
        setErrors('Ошибка при экспорте данных');
        setIsExporting(false);
      })
      .finally(() => {
        setIsExporting(false);
      });
  };

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    navigate('/');
  }

  return (
    <form className={classes.form} onSubmit={handleExport} noValidate>
      <div className={classes.formItem}>
        <label>
        <p className={classes.label}>Указать период</p>
          <div style={{ position: 'relative' }}>
            <DatePicker
              // inline
              selectsRange
              startDate={dateRange?.[0]}
              endDate={dateRange?.[1]}
              onChange={(update) => setDateRange(update)}
              dateFormat="dd.MM.yyyy"
              locale={ru}
              className="date-picker-input"
              isClearable
              shouldCloseOnSelect={true}
              customInput={
                <input 
                  className={classes.input}
                  autoComplete="off"
                />
              }
            />
            <CalendarSvg className={classes.calendarIcon} />
          </div>
          {errors && <div className={classes.errorMessage}>{errors}</div>}
        </label>
      </div>

      <div className={classes.formItem}>
        <button className={classes.button} type="submit">
          {isExporting ? 'Экспорт...' : 'Экспорт данных в Excel'}
        </button>
      </div>

      <div className={classes.formItem}>
        <button className={classes.buttonWhite} type='button' onClick={logOutHandler}>Выйти</button>
      </div>      
    </form>
  );
};

export default ExportForm;