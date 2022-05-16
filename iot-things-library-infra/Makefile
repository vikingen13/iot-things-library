
BuildEnv:
	python3 -m venv ./.venv;source .venv/bin/activate;pip install -r requirements.txt

Deploy:
	source .venv/bin/activate;cdk deploy --require-approval never --outputs-file ./cdk-outputs.json
