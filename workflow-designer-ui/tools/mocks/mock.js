const proxy = {
	'GET /sdc1/thresholds': { "id": "1", "listCount" : 1, "results" : [{"id": 4, "name": "My First Threshold"}] },
	'GET /sdc1/thresholds/:id': {"id": 4, "name": "My First Threshold"},
	'POST /sdc1/:component/metrics': {"id": "newId"},
	'GET /sdc1/:component/metrics': {
		"id": "1", "listCount" : 2, "results" :
			[
				{"id": 4, "name": "Metric A CPU", "description" : "the cpu metruc group tracks CPU ksdkfhsad sdjkf sklfhskdh f", "collectorType" : "SNMP"},
				{"id": 5, "name": "Metric A Storage", "description" : "Storage lf hasdkfhsdkfh sdklfhskfaskdfjhasdkfhasdkf", "collectorType" : "SNMP"}
			] },
	'GET /sdc1/:component/metrics/:id': {"id": 4, "name": "My First Metric"},
	'GET /sdc1/reference/metrics': {
		"types": [
			{ enum: '', title: 'Please select…' },
			{ enum: 'Network_Wide', title: 'Network Wide' },
			{ enum: 'Availability_Zone', title: 'Availability Zone' },
			{ enum: 'Data_Center', title: 'Data Center' },
			{ enum: 'Tenant', title: 'Tenant' },
			{ enum: 'VM', title: 'VM' },
			{ enum: 'CPU', title: 'CPU' },
			{ enum: 'Core', title: 'Core' }
		],
		"collectorTypes": {"Network_Wide" : [
			{ enum: '', title: 'Please select…' },
				{ enum: 'SNMP', title: 'SNMP', 'versions' : ['1','1.1'] },
				{ enum: 'aa', title: 'a', 'versions' : ['2','2.1'] },
		],"Availability_Zone" : [
				{ enum: '', title: 'Please select…' },
				{ enum: 'SNMP 2', title: 'SNMP', 'versions' : ['1','1.1'] },
				{ enum: 'aa 2', title: 'a', 'versions' : ['2','2.1'] },
			]},
		"reuse": [
			{ enum: '', title: 'Please select…' },
			{ enum: 'Reuse1', title: 'Reuse' },
			{ enum: 'Availability_Zone', title: 'Availability Zone' },
			{ enum: 'Data_Center', title: 'Data Center' },
			{ enum: 'Tenant', title: 'Tenant' },
			{ enum: 'VM', title: 'VM' },
			{ enum: 'CPU', title: 'CPU' },
			{ enum: 'Core', title: 'Core' }
		]
	},
	'GET /sdc1/reference/thresholds': {},
	'GET /sdc1/:type/ping/:id': { "id": "internal1" },
	'GET /error': (req, res) => {
		return res.json({
			status: 'error',
			code: 500
		});

	}
}
module.exports = proxy;
