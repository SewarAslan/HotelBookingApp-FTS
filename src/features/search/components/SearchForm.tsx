import { Formik, Form, type FormikHelpers } from "formik";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { buildSearchParams } from "../../../utils/url";
import { formatDate } from "../../../utils/date";
import SearchFields from "./SearchFields";

export interface SearchValues {
  city: string;
  checkInDate: dayjs.Dayjs | null;
  checkOutDate: dayjs.Dayjs | null;
  adults: number;
  children: number;
  rooms: number;
}

export default function SearchForm({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialValues: SearchValues = {
    city: params.get("city") || "",
    checkInDate: null,
    checkOutDate: null,
    adults: Number(params.get("adults")) || 2,
    children: Number(params.get("children")) || 0,
    rooms: Number(params.get("rooms")) || 1,
  };

  const handleSubmit = (
    values: SearchValues,
    formikHelpers: FormikHelpers<SearchValues>
  ) => {
    const { setErrors } = formikHelpers;

    const errors: Record<string, string> = {};

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const query = buildSearchParams({
      city: values.city,
      checkInDate: formatDate(values.checkInDate),
      checkOutDate: formatDate(values.checkOutDate),
      adults: values.adults,
      children: values.children,
      rooms: values.rooms,
    });

    navigate(`/results?${query}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, errors }) => (
        <Form>
          <SearchFields
            values={values}
            setFieldValue={setFieldValue}
            compact={compact}
            errors={errors}
          />
        </Form>
      )}
    </Formik>
  );
}
