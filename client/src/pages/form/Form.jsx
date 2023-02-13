import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Form = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tenHD: '',
    moTaHD: '',
    slToiThieuYC: 0,
    slToiDaYC: 0,
    ngayGioBD: '',
    ngayGioKT: '',
    lyDoHuyHD: '',
    trangThai: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        try {
          const res = await axios.get(
            `http://localhost:8801/api/hoat-dong/${params.id}`
          );
          if (res.data) {
            setData(res.data);
            setForm(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    getData();
  }, [params]);

  console.log(form);

  const handleChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = params.id
        ? await axios.put(
            `http://localhost:8801/api/hoat-dong/${params.id}`,
            form
          )
        : await axios.post('http://localhost:8801/api/hoat-dong', form);
      if (res.data) navigate('/');
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap="35px" p="20px" alignItems="center" justifyContent="center">
      <Typography variant="h1" fontSize="35px">
        {params.id ? 'Chinh sua hoat dong' : 'Tao moi hoat dong'}
      </Typography>
      <Stack gap="20px" width="60%">
        <Stack gap="10px">
          <span>Ten hoat dong</span>
          <TextField
            type="text"
            onChange={handleChange}
            name="tenHD"
            variant="outlined"
          />
        </Stack>
        <Stack gap="10px">
          <span>Mo ta hoat dong</span>
          <TextField type="text" onChange={handleChange} name="moTaHD" />
        </Stack>
        <Stack gap="10px">
          <span>So luong toi thieu</span>
          <TextField
            type="number"
            onChange={handleChange}
            name="slToiThieuYC"
          />
        </Stack>
        <Stack gap="10px">
          <span>So luong toi da</span>
          <TextField type="number" onChange={handleChange} name="slToiDaYC" />
        </Stack>
        {params.id && (
          <Stack gap="10px">
            <span>Ly do huy hoat dong</span>
            <TextField type="text" onChange={handleChange} name="lyDoHuyHD" />
          </Stack>
        )}
        <Stack gap="10px">
          <span>Thoi gian bat dau</span>
          <TextField type="date" name="ngayGioBD" onChange={handleChange} />
        </Stack>
        <Stack gap="10px">
          <span>Thoi gian ket thuc</span>
          <TextField type="date" name="ngayGioKT" onChange={handleChange} />
        </Stack>
        <Stack gap="10px">
          <span>Trang thai</span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={params.id && handleChange}
            name="trangThai"
            disabled={!params.id}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Stack>
        <Button
          variant="contained"
          disabled={loading}
          endIcon={loading && <CircularProgress />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Form;
