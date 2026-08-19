<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<div class="grid-content">
	<div class="grid-main">
		<h1 class="title">About</h1>
		<p class="text">This is the about page. Use it to test page transitions.</p>

		<div class="link-box">
			<a href={resolve("/")} class="underline">Back to Home</a>
			<a href={resolve("/about")} class="underline">Go To About Test</a>
		</div>
	</div>
</div>

<style>
	.title {
		@responsive {
			@text h1Desktop;
			margin: 24px 0;

			
		}
		@small {
			@text h1Mobile;
		}
	}

	.text {
		@responsive {
			@text p1;
			margin-bottom: 24px;
		}
	}

	.link-box {
		@responsive {
			display: flex;
			gap: 24px;
		}
	}
</style>
