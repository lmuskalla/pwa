deploy:
	cd deployment && \
	ansible-playbook -i hosts.ini deploy.yml
