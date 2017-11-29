const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const superagent = require('superagent');

router.get('/', function(req, res){
	res.json({
		confirmation: 'success',
		data: 'this is the metrics route'
	})
})

router.post('/', function(req, res) {
	var review = req.body.review;
	var url = 'production.turbo360-vector.com/text-metrics-nlugpj/metrics';

	superagent
	.get(url)
	.query({ lang: 'en', text: review })
	.end((err, response) => {
		if (err) {
			res.json({
				confirmation: 'fail',
				message: err.message,
			})
			return
		}

		var metrics = JSON.parse(response.text);

		turbo.create('metrics', metrics)
		.then(data => {
			res.json({
				confirmation: 'success',
				data: data
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})

		return
	})

})

module.exports = router