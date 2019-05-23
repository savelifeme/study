import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Button, Breadcrumb, Icon, Table, Modal } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky'; //tab标签页

const TabPane = Tabs.TabPane;

@connect(({ test, loading }) => ({ test, submitting: loading.effects }))
export default class Article extends Component {
	state = {
		filteredInfo: null,
		sortedInfo: null,
		loading: false,
		visible: false
	};

	handleChange = (pagination, filters, sorter) => {
		console.log('Various parameters', pagination, filters, sorter);
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter
		});
	};

	clearFilters = () => {
		this.setState({ filteredInfo: null });
	};

	clearAll = () => {
		this.setState({
			filteredInfo: null,
			sortedInfo: null
		});
	};

	setAgeSort = () => {
		this.setState({
			sortedInfo: {
				order: 'descend',
				columnKey: 'age'
			}
		});
	};

	// modal框start
	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false, visible: false });
		}, 3000);
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};
	// modal框end

	render() {
		const data = [
			{
				key: '1',
				name: 'John Brown',
				age: 32,
				address: '你吃了吗'
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				address: '我吃了，但是没有吃饱'
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				address: '我也是耶，没有吃饱，好饿。'
			},
			{
				key: '4',
				name: 'Jim Red',
				age: 32,
				address: '但是，我不想动了，我还想吃东西，你好坏，不让我吃东西。'
			}
		];

		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				filters: [ { text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' } ],
				filteredValue: filteredInfo.name || null,
				onFilter: (value, record) => record.name.includes(value),
				sorter: (a, b) => a.name.length - b.name.length,
				sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
				sorter: (a, b) => a.age - b.age,
				sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
				filters: [ { text: 'London', value: 'London' }, { text: 'New York', value: 'New York' } ],
				filteredValue: filteredInfo.address || null,
				onFilter: (value, record) => record.address.includes(value),
				sorter: (a, b) => a.address.length - b.address.length,
				sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
			}
		];
		const renderTabBar = (props, DefaultTabBar) => (
			<Sticky bottomOffset={80}>
				{({ style }) => <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />}
			</Sticky>
		);
		// modal框
		const { visible, loading } = this.state;

		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item href="">
						<Icon type="home" />
						<span>学习是我快乐</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="">
						<Icon type="user" />
						<span>我的世界</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				<div>
                    <Button type="primary" onClick={this.showModal} style={{ display:'flex',justifyItems:'flex-end' }}>新增</Button>
					<StickyContainer>
						<Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
							<TabPane tab="总体目标" key="1" style={{ height: '100%' }}>
								{/* <div className="table-operations">
									<Button onClick={this.setAgeSort}>Sort age</Button>
									<Button onClick={this.clearFilters}>Clear filters</Button>
									<Button onClick={this.clearAll}>Clear filters and sorters</Button>
								</div> */}
								<Table columns={columns} dataSource={data} onChange={this.handleChange} />
							</TabPane>
							<TabPane tab="年度目标" key="2">
								Content of Tab Pane 2
							</TabPane>
							<TabPane tab="月目标" key="3">
								Content of Tab Pane 3
							</TabPane>
						</Tabs>
					</StickyContainer>

					<Modal
						visible={visible}
						title="Title"
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>保存</Button>,
							<Button key="back" onClick={this.handleCancel}>返回</Button>
						]}
					>
						<p>Some contents...</p>
					</Modal>
				</div>
			</div>
		);
	}
}
