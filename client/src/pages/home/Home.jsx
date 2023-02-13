import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Home = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'title',
      headerName: 'Hoat dong',
      minWidth: 180,
      flex: 1,
      renderCell: (params) => {
        <Tooltip title={params.value}>
          <Typography
            sx={{
              whiteSpace: ' nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            fontSize="14px"
          >
            {params.value}
          </Typography>
        </Tooltip>;
      },
    },
    {
      field: 'desc',
      headerName: 'Mo ta',
      minWidth: 180,
      flex: 1,
      renderCell: (params) => {
        <Tooltip title={params.value}>
          <Typography
            sx={{
              whiteSpace: ' nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            fontSize="14px"
          >
            {params.value}
          </Typography>
        </Tooltip>;
      },
    },
    {
      field: 'slToiThieuYC',
      headerName: 'So luong toi thieu',
      flex: 1,
    },
    {
      field: 'slToiDaYC',
      headerName: 'So luong toi da',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trang thai',
      flex: 1,
      renderCell: (params) => handleStatus(params.value),
    },
    {
      field: 'ngayGioBD',
      headerName: 'Ngay gio Bat Dau',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value}>
            <Typography
              sx={{
                whiteSpace: ' nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              fontSize="14px"
            >
              {moment(params.value).format('lll')}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'ngayGioKT',
      headerName: 'Ngay gio Ket Thuc',
      minWidth: 180,

      flex: 1,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value}>
            <Typography
              sx={{
                whiteSpace: ' nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              fontSize="14px"
            >
              {moment(params.value).format('lll')}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        if (params.row !== undefined) {
          const data = params.row.idHD;
          const status = params.row.status;
          return (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => navigate(`/edit/${data}`)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(params.row.idHD)}
                disabled={status === 3}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        }
      },
    },
  ];

  const handleStatus = (status) => {
    if (status === 0) return 'Đang mời đăng ký';
    if (status === 1) return 'Đã hết hạn đăng ký';
    if (status === 2) return 'Trưởng đoàn tự huỷ';
    return ' Đã kết thúc';
  };

  const hoatDongList = data?.map((hoatDong, index) => {
    return {
      id: ++index,
      idHD: hoatDong._id,
      title: hoatDong.tenHD,
      desc: hoatDong.moTaHD,
      slToiThieuYC: hoatDong.slToiThieuYC,
      slToiDaYC: hoatDong.slToiDaYC,
      status: hoatDong.trangThai,
      ngayGioBD: hoatDong.ngayGioBD,
      ngayGioKT: hoatDong.ngayGioKT,
    };
  });

  const handleDelete = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:8801/api/hoat-dong/${data}`
      );
      if (res.data) fetchData();
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8801/api/hoat-dong');
      if (res.data) setData(res.data);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      p="20px"
      height="calc(100vh- 20px)"
    >
      <Stack width="100%" height="650px" gap="15px">
        <Typography variant="h1" fontSize="36px">
          Danh sách hoạt động
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/create')}
          sx={{ maxWidth: '200px' }}
        >
          Tao moi hoat dong
        </Button>
        <DataGrid
          columns={columns ? columns : []}
          rows={hoatDongList !== undefined ? hoatDongList : []}
          loading={hoatDongList === undefined}
        />
      </Stack>
    </Stack>
  );
};

export default Home;
