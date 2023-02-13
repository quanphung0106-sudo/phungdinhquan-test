import {
  Button,
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
  const [status, setStatus] = useState('');
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
          if (res.data) setData(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getData();
  }, [params]);

  const handleChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        trangThai: params.id ? e.target.value : 0,
      };
    });
  };

  const handleSubmit = async () => {
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
    }
  };

  return (
    <Stack gap="35px" p="20px" alignItems="center" justifyContent="center">
      <Typography variant="h1" fontSize="35px">
        {params.id ? 'Chinh sua hoat dong' : 'Tao moi hoat dong'}
      </Typography>
      <Stack gap="20px" width="60%">
        <TextField
          type="text"
          onChange={handleChange}
          name="tenHD"
          label="Ten hoat dong"
          variant="outlined"
        />
        <TextField
          type="text"
          onChange={handleChange}
          name="moTaHD"
          label="Mo ta hoat dong"
        />
        <TextField
          type="number"
          onChange={handleChange}
          name="slToiThieuYC"
          label="So luong toi thieu"
        />
        <TextField
          type="number"
          onChange={handleChange}
          name="slToiDaYC"
          label="So luong toi da"
        />
        {params.id && (
          <TextField
            type="text"
            onChange={handleChange}
            name="lyDoHuyHD"
            label="Ly do huy hoat dong"
          />
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
            value={params.id ? form?.status : 0}
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Form;
