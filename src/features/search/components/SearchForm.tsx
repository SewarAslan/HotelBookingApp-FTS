import { Formik, Form } from "formik";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { searchSchema } from "../../../constants/searchSchema";
import { buildSearchParams } from "../../../utils/url";
import { formatDate } from "../../../utils/date";
import SearchFields from "./SearchFields";

export interface SearchValues {
  city: string;
  checkInDate: dayjs.Dayjs;
  checkOutDate: dayjs.Dayjs;
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
    checkInDate: params.get("checkInDate")
      ? dayjs(params.get("checkInDate"))
      : dayjs(),
    checkOutDate: params.get("checkOutDate")
      ? dayjs(params.get("checkOutDate"))
      : dayjs().add(1, "day"),
    adults: Number(params.get("adults")) || 2,
    children: Number(params.get("children")) || 0,
    rooms: Number(params.get("rooms")) || 1,
  };

  const handleSubmit = (values: SearchValues) => {
    const query = buildSearchParams({
      city: values.city,
      checkInDate: formatDate(values.checkInDate),
      checkOutDate: formatDate(values.checkOutDate),
      adults: values.adults,
      children: values.children,
      rooms: values.rooms,
    });

    if (location.pathname.includes("/results")) {
      navigate(`/results?${query}`, { replace: true });
    } else {
      navigate(`/results?${query}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={searchSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <SearchFields
            values={values}
            setFieldValue={setFieldValue}
            compact={compact}
          />
        </Form>
      )}
    </Formik>
  );
}
