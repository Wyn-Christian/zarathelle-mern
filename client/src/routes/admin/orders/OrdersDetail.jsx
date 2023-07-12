import { DateTime } from "luxon";
import {
	Box,
	Button,
	CardMedia,
	Chip,
	Divider,
	Paper,
	Typography,
	useTheme,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link, useParams } from "react-router-dom";
import {
	useChangeStatusOrderMutation,
	useGetOrderQuery,
} from "../../../features/apiSlice";
import { api_base_url } from "../../../app/base_url";
import LoadingProgress from "../../../components/LoadingProgress";
import { PHPPrice } from "../../../app/priceFormatter";

const Title = ({ title }) => (
	<Box>
		<Box m={1}>
			<Typography variant="h6" fontWeight="bold">
				{title}
			</Typography>
		</Box>
		<Divider />
	</Box>
);
const Info = ({ title, value }) => (
	<Box>
		<Box m={1}>
			<Typography>{title}</Typography>
			<Typography variant="body2" color="gray">
				{value}
			</Typography>
		</Box>
		<Divider />
	</Box>
);

const ImageColumn = ({ row }) => {
	return (
		<Paper sx={{ m: "auto" }}>
			<CardMedia
				image={`${api_base_url}${row.product.image_url}`}
				sx={{ height: 60, width: 60 }}
			/>
		</Paper>
	);
};

const CategoryInfo = ({ row }) => {
	if (row.product.category === "ready made") {
		return <Chip label="Ready Made" color="primary" />;
	} else {
		return <Chip label="Customizable" color="secondary" />;
	}
};

const CustomPhotoColumn = ({ row }) => {
	if (row.product.category === "customizable") {
		return (
			<Paper sx={{ m: "auto" }}>
				<CardMedia
					image={`${api_base_url}${row.image_url}`}
					sx={{ height: 60, width: 60 }}
					component={Link}
					to={`${api_base_url}${row.image_url}`}
					target="_blank"
				/>
			</Paper>
		);
	}
};

const columns = [
	{
		field: "image",
		headerName: "Image",
		width: 100,
		headerAlign: "center",
		renderCell: (params) => <ImageColumn {...params} />,
	},
	{
		field: "product",
		headerName: "Product",
		width: 200,
		valueFormatter: (product) => product.value.name,
	},
	{
		field: "price",
		headerName: "Price",
		width: 100,
		valueFormatter: (price) => PHPPrice.format(price.value),
	},
	{
		field: "quantity",
		headerName: "Quantity",
		width: 100,
		valueFormatter: (qty) =>
			`${qty.value} ${qty.value > 1 ? "items" : "item"}`,
	},
	{
		field: "category",
		headerName: "Category",
		width: 125,
		headerAlign: "center",
		renderCell: (params) => <CategoryInfo {...params} />,
	},
	{
		field: "custom-photo",
		headerName: "Custom Photo",
		width: 125,
		headerAlign: "center",
		renderCell: (params) => <CustomPhotoColumn {...params} />,
	},
];

const StatusInfo = ({ status }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(status);
	const handleChange = (e) => setCurrentStatus(e.target.value);
	const { id } = useParams();
	const [changeStatusOrder] = useChangeStatusOrderMutation();

	const handleSaveClick = async () => {
		await changeStatusOrder({ id, data: { status: currentStatus } }).then(
			(res) => {
				console.log("Status Changed successfully", res);
			}
		);
	};
	useEffect(() => {
		if (status === "delivered" || status === "cancelled") {
			setIsDisabled(true);
		}
	}, [status]);
	return (
		<Paper elevation={3}>
			<Title title="Status" />
			<Box
				sx={{
					display: "flex",
					height: 100,
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<FormControl sx={{ width: { xs: "50%", md: "80%" } }}>
					<Select
						id="status"
						value={currentStatus}
						onChange={handleChange}
					>
						<MenuItem value={"to process"}>
							<Chip label="To Process" color="warning" />
						</MenuItem>
						<MenuItem value={"on its way"}>
							<Chip label="On Its Way" color="info" />
						</MenuItem>
						<MenuItem value={"delivered"}>
							<Chip label="Delivered" color="success" />
						</MenuItem>
						<MenuItem value={"cancelled"}>
							<Chip label="Cancelled" color="error" />
						</MenuItem>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					disabled={isDisabled}
					onClick={handleSaveClick}
				>
					Save
				</Button>
			</Box>
		</Paper>
	);
};

function OrdersDetail() {
	const { id } = useParams();
	const { data: order = [], isSuccess, isLoading } = useGetOrderQuery(id);

	let content;
	if (isLoading) {
		content = <LoadingProgress />;
	} else if (isSuccess) {
		content = (
			<Box>
				<Grid container spacing={4}>
					<Grid xs={12} md={6}>
						<Paper elevation={3}>
							<Title title="User Details" />
							<Info title="User Name" value={order.user.username} />
							<Info title="Full Name" value={order.user.full_name} />
							<Info title="Email" value={order.user.email} />
							<Info title="Phone" value={order.user.phone} />
							<Info title="Address" value={order.user.address} />
						</Paper>
					</Grid>
					<Grid xs={12} md={6}>
						<Paper elevation={3}>
							<Title title="Order Details" />
							<Info
								title="Date Created"
								value={DateTime.fromISO(order.createdAt).toLocaleString(
									DateTime.DATE_MED_WITH_WEEKDAY
								)}
							/>
							<Info
								title="Total Price"
								value={PHPPrice.format(order.total_price)}
							/>
							<Info
								title="Total Quantity"
								value={`${order.total_quantity} ${
									order.total_quantity > 1 ? "items" : "item"
								}`}
							/>
						</Paper>
					</Grid>
					<Grid xs={12}>
						<StatusInfo {...order} />
					</Grid>
					<Grid xs={12}>
						<DataGrid
							rowHeight={100}
							rows={order?.items}
							columns={columns}
							pageSizeOptions={[5, 10, 25]}
							initialState={{
								pagination: { paginationModel: { pageSize: 5 } },
							}}
							sx={{
								boxShadow: 2,
								border: 1,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h4">Order Details</Typography>

			<Box>
				<Typography variant="overline">Order ID: </Typography>
				<Chip label={id} size="small" />
			</Box>

			{content}
		</Box>
	);
}

export default OrdersDetail;
