<template>
	<div class="layout-breadcrumb">
		<ul>
			<li><button class="p-link" @click="home"><i class="pi pi-home"></i></button></li>
			<li><i class="pi pi-chevron-right chevron-icon"></i></li>
			<li>{{$route.path.split('/')[1]}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		methods: {
			home() {
				window.location = "/"
			}
		}
	}
</script>

<style scoped>

</style>
